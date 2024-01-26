export namespace IQueueTopic {
  export interface TopicInput {
    topic: string;
  }
  export interface SubscriptionInput {
    topicArn: string;
    queueUrl: string;
  }
  export interface Implements {
    createTopic(props: TopicInput): Promise<string | boolean>;
    listTopics(): Promise<string[]>;
    getTopic(props: TopicInput): Promise<string | undefined>;
    deleteTopic(props: TopicInput): Promise<boolean>;
    subscription(props: SubscriptionInput): Promise<boolean>;
  }
}
