export namespace ISQSService {
  export interface Message {
    message: string;
    receipId: string;
    messageId: string;
    messageAttributes: object;
  }
  export interface Queue {
    QueueName: string;
  }
  export interface DispatchMessageProps extends Queue {
    message: string;
    messageAttributes?: MessageAttributes;
  }
  export interface ReceiveMessagesProps extends Queue {
    messageAttributesNames?: string[];
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

    getQueue(props: Queue): Promise<string | undefined>;

    hasQueue(props: Queue): Promise<boolean>;
  }
}
