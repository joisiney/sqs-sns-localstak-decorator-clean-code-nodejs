import { IAWSCredentials } from '@/application/config/aws.config';
import { IQueueTopic } from '@/application/service/queue-topic.service';
import {
  CreateTopicCommand,
  DeleteTopicCommand,
  ListTopicsCommand,
  SNSClient,
  SubscribeCommand,
} from '@aws-sdk/client-sns';

export class SNSService implements IQueueTopic.Implements {
  private readonly snsClient: SNSClient;
  constructor(credentials: IAWSCredentials) {
    this.snsClient = new SNSClient(credentials);
  }

  async createTopic(props: IQueueTopic.TopicInput): Promise<string | boolean> {
    try {
      const response = await this.snsClient.send(
        new CreateTopicCommand({ Name: props.topic }),
      );
      if (!response.TopicArn) {
        return false;
      }
      return response.TopicArn;
    } catch {
      return false;
    }
  }

  async listTopics(): Promise<string[]> {
    try {
      const response = await this.snsClient.send(new ListTopicsCommand({}));
      return (response.Topics ?? [])
        .map((topic) => topic.TopicArn)
        .filter(Boolean) as string[];
    } catch {
      return [];
    }
  }

  async getTopic(props: IQueueTopic.TopicInput): Promise<string | undefined> {
    try {
      const data = await this.listTopics();
      const topic = data.find((topic) => topic.endsWith(`:${props.topic}`));
      return topic;
    } catch (error) {
      return undefined;
    }
  }

  async deleteTopic(props: IQueueTopic.TopicInput): Promise<boolean> {
    try {
      const TopicArn = await this.getTopic(props);
      if (!TopicArn) {
        return false;
      }
      const response = await this.snsClient.send(
        new DeleteTopicCommand({ TopicArn }),
      );
      if (!response.$metadata.httpStatusCode) {
        return false;
      }
      return true;
    } catch {
      return false;
    }
  }
  /*
  aws sns subscribe \
--endpoint-url http://localhost:4566 \
--region us-east-1 \
--topic-arn arn:aws:sns:us-east-1:000000000000:local-topic \
--protocol sqs \
--notification-endpoint arn:aws:sqs:us-east-1:000000000000:local-queue */
  async subscription(props: IQueueTopic.SubscriptionInput): Promise<boolean> {
    try {
      console.log(props);
      const response = await this.snsClient.send(
        new SubscribeCommand({
          Protocol: 'sqs',
          TopicArn: props.topicArn,
          Endpoint: props.queueUrl,
        }),
      );
      console.log(response);
      if (!response.$metadata.httpStatusCode) {
        return false;
      }
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
