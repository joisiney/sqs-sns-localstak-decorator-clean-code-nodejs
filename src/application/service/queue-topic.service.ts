export namespace IQueueTopic {
  export interface Topic {
    topic: string;
  }

  export interface Implements {
    createTopic(props: Topic): Promise<string>;
    listTopics(): Promise<string[]>;
    getTopic(props: Topic): Promise<string>;
    deleteTopic(props: Topic): Promise<boolean>;
  }
}
