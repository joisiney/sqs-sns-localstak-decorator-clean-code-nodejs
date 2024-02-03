import { BadRequestException } from '@/application/exceptions';
import { IQueueTopicSubscriptionService } from '@/application/service/queue-topic-subscription.service';
import { IQueueTopic } from '@/application/service/queue-topic.service';
import { IQueueService } from '@/application/service/queue.service';
import { Inject } from '@/infra/decorator';
import {
  GetSubscriptionAttributesCommand,
  ListSubscriptionsCommand,
  SNSClient,
  SubscribeCommand,
} from '@aws-sdk/client-sns';

export class SNSSubscriptionService
  implements IQueueTopicSubscriptionService.Implements
{
  @Inject('SQS_SERVICE')
  private readonly sqsService: IQueueService.Implements;

  @Inject('SNS_SERVICE')
  private readonly snsService: IQueueTopic.Implements;

  private memorySubscription: { [key: string]: string } = {};

  constructor(private readonly snsClient: SNSClient) {}

  private async getTopicAndQueueArn(
    props: IQueueTopicSubscriptionService.QueueTopic,
  ) {
    if (this.memorySubscription[`${props.queue}-${props.topic}`]) {
      throw new BadRequestException('Subscription already exists');
    }
    const [TopicArn, Endpoint] = await Promise.all([
      this.snsService.getTopic({ topic: props.topic }),
      this.sqsService.getQueueArn({ queue: props.queue }),
    ]);
    return { TopicArn, Endpoint };
  }

  async createSubscription(
    props: IQueueTopicSubscriptionService.QueueTopic,
  ): Promise<string> {
    const { TopicArn, Endpoint } = await this.getTopicAndQueueArn(props);

    const response = await this.snsClient.send(
      new SubscribeCommand({
        Protocol: 'sqs',
        TopicArn,
        Endpoint,
      }),
    );

    if (!response.$metadata.httpStatusCode || !response.SubscriptionArn) {
      throw new BadRequestException('Subscription not created');
    }
    this.memorySubscription[`${props.queue}-${props.topic}`] =
      response.SubscriptionArn;

    return response.SubscriptionArn;
  }

  async listSubscription(): Promise<
    IQueueTopicSubscriptionService.Subscription[]
  > {
    const response = await this.snsClient.send(
      new ListSubscriptionsCommand({}),
    );
    if (!response.Subscriptions || response.$metadata.httpStatusCode !== 200) {
      throw new BadRequestException('Subscription not found');
    }

    return response.Subscriptions.map((subscription) => ({
      topic: subscription.TopicArn as string,
      queue: subscription.Endpoint as string,
      subscription: subscription.SubscriptionArn as string,
    }));
  }

  private async getSubscriptionByTopicAndQueue(
    props: Omit<IQueueTopicSubscriptionService.QueueTopic, 'subscription'>,
  ): Promise<IQueueTopicSubscriptionService.Subscription> {
    const { TopicArn, Endpoint } = await this.getTopicAndQueueArn(props);
    const subscriptions = await this.listSubscription();
    const subscription = subscriptions.find(
      ({ topic, queue }) => topic === TopicArn && queue === Endpoint,
    );
    if (!subscription) {
      throw new BadRequestException('Subscription not found');
    }

    return subscription;
  }

  private async getSubscriptionByArn({
    subscription,
  }: Pick<IQueueTopicSubscriptionService.Subscription, 'subscription'>) {
    const response = await this.snsClient.send(
      new GetSubscriptionAttributesCommand({
        SubscriptionArn: subscription,
      }),
    );
    if (!response.Attributes || response.$metadata.httpStatusCode !== 200) {
      throw new BadRequestException('Subscription not found');
    }
    return {
      topic: response.Attributes.TopicArn as string,
      queue: response.Attributes.Endpoint as string,
      subscription: response.Attributes.SubscriptionArn as string,
    };
  }

  async getSubscription(
    props: IQueueTopicSubscriptionService.QueueTopic,
  ): Promise<IQueueTopicSubscriptionService.Subscription> {
    if ('subscription' in props) {
      return this.getSubscriptionByArn(
        props as Required<IQueueTopicSubscriptionService.Subscription>,
      );
    }
    if ('topic' in props && 'queue' in props) {
      return this.getSubscriptionByTopicAndQueue(
        props as Required<IQueueTopicSubscriptionService.QueueTopic>,
      );
    }
    throw new BadRequestException('Parameter not found');
  }
}
