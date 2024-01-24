import {
  CreateQueueCommand,
  GetQueueUrlCommand,
  SQSClient,
} from '@aws-sdk/client-sqs';

import { IAWSCredentials } from '@/application/config/aws.config';
import { ISQSService } from '@/application/service/sqs.service';

export class SQSProducerService implements ISQSService.Implements {
  private readonly sqsClient: SQSClient;
  constructor(
    private readonly queueName: string,
    credentials: IAWSCredentials,
  ) {
    this.sqsClient = new SQSClient(credentials);
  }
  dispatchMessage(props: ISQSService.CreateInput): Promise<boolean> {
    console.log(props);
    throw new Error('Method not implemented.');
  }

  async createQueue(): Promise<boolean> {
    try {
      const QueueUrl = await this.recoverUrlQueue();
      if (QueueUrl) return false;
      await this.sqsClient.send(
        new CreateQueueCommand({ QueueName: this.queueName }),
      );
      return true;
    } catch {
      return false;
    }
  }

  async recoverUrlQueue(): Promise<string | undefined> {
    try {
      const response = await this.sqsClient.send(
        new GetQueueUrlCommand({ QueueName: this.queueName }),
      );
      return response.QueueUrl;
    } catch {
      return undefined;
    }
  }

  async hasQueue(): Promise<boolean> {
    const response = await this.recoverUrlQueue();
    return !!response;
  }
}
