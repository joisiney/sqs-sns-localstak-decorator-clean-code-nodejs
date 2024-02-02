export namespace IQueueTopicSubscriptionService {
  export interface QueueTopic {
    topic: string;
    queue: string;
  }
  export interface Subscription {
    subscription: string;
    topic: string;
    queue: string;
  }
  export interface SubscriptionInput {
    subscription: string;
  }
  export interface Implements {
    createSubscription(
      props: IQueueTopicSubscriptionService.QueueTopic,
    ): Promise<string>;

    listSubscription(): Promise<Subscription[]>;
    getSubscription(
      props: Partial<IQueueTopicSubscriptionService.Subscription>,
    ): Promise<Subscription>;
  }
}
