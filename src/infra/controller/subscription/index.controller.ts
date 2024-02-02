import { AbstractController } from '@/application/controller/abstract.controller';
import { IQueueTopicSubscriptionService } from '@/application/service/queue-topic-subscription.service';
import {
  ITopicAndQueueDto,
  TopicAndQueueDto,
} from '@/infra/controller/subscription/dto/topic-and-queue-name.dto';

import { Controller, Inject, Route } from '@/infra/decorator';

@Controller('/sns')
export class SubscriptionController extends AbstractController {
  @Inject('SNS_SUBSCRIPTION_SERVICE')
  public readonly snsSubscriptionService: IQueueTopicSubscriptionService.Implements;

  @Route({
    method: 'POST',
    url: '/topic/subscription',
    dto: TopicAndQueueDto,
  })
  async createSubscriptonTopic(
    response: ITopicAndQueueDto,
  ): Promise<{ subscription: string }> {
    const subscription = await this.snsSubscriptionService.createSubscription(
      response,
    );
    return { subscription };
  }

  @Route({
    method: 'GET',
    url: '/topic/subscriptions',
  })
  async listSubscriptionTopics(): Promise<{
    subscription: IQueueTopicSubscriptionService.Subscription[];
  }> {
    const subscription = await this.snsSubscriptionService.listSubscription();
    return { subscription };
  }

  @Route({
    method: 'GET',
    url: '/topic/subscription',
    dto: TopicAndQueueDto,
  })
  async getSubscriptionByTopicAndQueue(
    response: IQueueTopicSubscriptionService.QueueTopic,
  ): Promise<{
    subscription: IQueueTopicSubscriptionService.Subscription;
  }> {
    const subscription = await this.snsSubscriptionService.getSubscription(
      response,
    );
    return { subscription };
  }
}
