import { BadRequestException } from '@/application/exceptions';
import { IQueueService } from '@/application/service/queue.service';
import {
  CreateQueueCommand,
  DeleteMessageBatchCommand,
  DeleteQueueCommand,
  GetQueueAttributesCommand,
  GetQueueUrlCommand,
  ListQueuesCommand,
  MessageAttributeValue,
  ReceiveMessageCommand,
  SQSClient,
  SendMessageCommand,
} from '@aws-sdk/client-sqs';

export class SQSService implements IQueueService.Implements {
  private memoryQueueUrl: { [key: string]: string } = {};
  constructor(private readonly sqsClient: SQSClient) {}

  async dispatchMessage(
    props: IQueueService.DispatchMessageProps,
  ): Promise<boolean> {
    const QueueUrl = await this.getQueueUrl(props);
    const MessageAttributes = this.transformObjectToMessageAttributes(
      props.messageAttributes || {},
    );

    await this.sqsClient.send(
      new SendMessageCommand({
        MessageBody: props.message,
        QueueUrl,
        MessageAttributes,
      }),
    );
    return true;
  }

  async receiveMessages(
    props: IQueueService.ReceiveMessagesProps,
  ): Promise<IQueueService.Message[]> {
    const QueueUrl = await this.getQueueUrl(props);

    const receiveMessageCommand = new ReceiveMessageCommand({
      QueueUrl,
      MaxNumberOfMessages: props.take ?? 10,
      WaitTimeSeconds: props.awaitTimeSeconds ?? 2,
      VisibilityTimeout: props.visibilityTimeoutSeconds ?? 2,
      AttributeNames: ['All'],
      MessageAttributeNames: props.messageAttributesNames ?? [],
    });

    const data = await this.sqsClient.send(receiveMessageCommand);

    if (!data || !data.Messages) return [];

    return data.Messages.filter(
      (message) => !!message.Body && !!message.ReceiptHandle,
    ).map(
      (message) =>
        ({
          message: message.Body,
          receipId: message.ReceiptHandle,
          messageId: message.MessageId,
          messageAttributes: message.MessageAttributes
            ? this.transformMessageAttributesToObject(message.MessageAttributes)
            : {},
        } as IQueueService.Message),
    );
  }

  async deleteMessages(
    props: IQueueService.DeleteMessagesProps,
  ): Promise<boolean> {
    try {
      if (props.messages.length === 0) return true;

      const QueueUrl = await this.getQueueUrl(props);

      await this.sqsClient.send(
        new DeleteMessageBatchCommand({
          QueueUrl,
          Entries: props.messages.map(({ receipId, messageId }) => ({
            Id: messageId,
            ReceiptHandle: receipId,
          })),
        }),
      );
      return true;
    } catch (err) {
      if (err instanceof BadRequestException) {
        throw err;
      }
      throw new BadRequestException('Queues not found');
    }
  }

  async createQueue(props: IQueueService.Queue): Promise<boolean> {
    const isExists = await this.hasQueue(props);
    if (isExists) {
      throw new BadRequestException('Queue already exists');
    }
    await this.sqsClient.send(
      new CreateQueueCommand({
        QueueName: props.queue,
      }),
    );
    return true;
  }

  async listQueue(props: IQueueService.Queue): Promise<string[]> {
    const response = await this.sqsClient.send(
      new ListQueuesCommand({ QueueNamePrefix: props.queue }),
    );

    if (!response || !response.QueueUrls) {
      throw new BadRequestException('There is no registered queue');
    }
    return response.QueueUrls;
  }

  async deleteQueue(props: IQueueService.Queue): Promise<boolean> {
    const QueueUrl = await this.getQueueUrl(props);

    await this.sqsClient.send(new DeleteQueueCommand({ QueueUrl }));

    if (this.memoryQueueUrl[props.queue]) {
      delete this.memoryQueueUrl[props.queue];
    }

    return true;
  }

  async getQueueUrl(props: IQueueService.Queue): Promise<string> {
    if (this.memoryQueueUrl && this.memoryQueueUrl[props.queue]) {
      return this.memoryQueueUrl[props.queue];
    }
    const response = await this.sqsClient.send(
      new GetQueueUrlCommand({
        QueueName: props.queue,
      }),
    );
    if (!response || !response.QueueUrl) {
      throw new BadRequestException('Queue not found');
    }
    this.memoryQueueUrl[props.queue] = response.QueueUrl;
    return response.QueueUrl;
  }

  async getQueueArn(props: IQueueService.Queue): Promise<string> {
    const QueueUrl = await this.getQueueUrl(props);
    const response = await this.sqsClient.send(
      new GetQueueAttributesCommand({
        QueueUrl,
        AttributeNames: ['QueueArn'],
      }),
    );

    if (!response || !response.Attributes || !response.Attributes.QueueArn) {
      throw new BadRequestException('Queue not found');
    }

    return response.Attributes.QueueArn;
  }

  async hasQueue(props: IQueueService.Queue): Promise<boolean> {
    try {
      const response = await this.getQueueUrl(props);
      return !!response;
    } catch {
      return false;
    }
  }

  private transformObjectToMessageAttributes(
    object: IQueueService.MessageAttributes,
  ) {
    return Object.entries(object).reduce((acc, [key, StringValue]) => {
      let DataType = 'String';
      switch (typeof StringValue) {
        case 'number':
          StringValue = String(StringValue);
          DataType = 'Number';
          break;
        case 'boolean':
          StringValue = StringValue ? 'true' : 'false';
          DataType = 'Binary';
          break;
      }

      return {
        ...acc,
        [key]: {
          DataType,
          StringValue,
        },
      };
    }, {});
  }

  private transformMessageAttributesToObject(
    object: Record<string, MessageAttributeValue>,
  ) {
    return Object.entries(object).reduce(
      (acc, [key, { DataType, StringValue }]) => {
        if (!StringValue) return acc;
        let value: number | string | boolean = StringValue;
        switch (DataType) {
          case 'Number':
            value = Number(value);
            break;
          case 'Binary':
            value = value === 'true';
            break;
        }

        return {
          ...acc,
          [key]: value,
        };
      },
      {},
    );
  }
}
