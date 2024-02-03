export namespace IQueueService {
  export interface Message {
    message: string;
    receipId: string;
    messageId: string;
    messageAttributes: object;
  }
  export interface Queue {
    queue: string;
  }
  export interface DispatchMessageProps extends Queue {
    message: string;
    messageAttributes?: MessageAttributes;
  }
  export interface ReceiveMessagesProps extends Queue {
    messageAttributesNames?: string[];
    take?: number;
    awaitTimeSeconds?: number;
    visibilityTimeoutSeconds?: number;
  }
  export interface DeleteMessagesProps extends Queue {
    messages: Message[];
  }

  export interface MessageAttributes {
    [key: string]: number | string | boolean;
  }
  export interface Implements {
    dispatchMessage(props: DispatchMessageProps): Promise<boolean>;
    receiveMessages(props: ReceiveMessagesProps): Promise<Message[]>;
    deleteMessages(props: DeleteMessagesProps): Promise<boolean>;
    createQueue(props: Queue): Promise<boolean>;
    listQueue(props: Queue): Promise<string[]>;
    deleteQueue(props: Queue): Promise<boolean>;
    getQueueUrl(props: Queue): Promise<string>;
    getQueueArn(props: Queue): Promise<string>;
    hasQueue(props: Queue): Promise<boolean>;
  }
}
