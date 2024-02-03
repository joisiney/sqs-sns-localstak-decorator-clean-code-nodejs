import { IQueueService } from '@/application/service/queue.service';

import { Inject, QueueConsumer } from '@/infra/decorator';
import { IQueueConsumer } from '@/infra/decorator/queue-consumer/index.dto';

export class QueueConsumerService {
  @Inject('SQS_SERVICE')
  public readonly sqsService: IQueueService.Implements;

  private async receiveMessages({
    queue,
  }: Pick<IQueueConsumer.InternalProps, 'queue'>): Promise<
    IQueueService.Message[]
  > {
    return this.sqsService.receiveMessages({
      queue,
      awaitTimeSeconds: 2,
      take: 10,
      visibilityTimeoutSeconds: 2,
      messageAttributesNames: ['name', 'age', 'isActived'],
    });
  }
  private async consumerMessages({ messages }: IQueueConsumer.InternalProps) {
    console.log(messages);
    new Promise((resolve) => {
      setTimeout(() => {
        resolve('done');
      }, 2000);
    });
  }
  private async deleteMessages({
    queue,
    messages,
  }: IQueueConsumer.InternalProps): Promise<void> {
    await this.sqsService.deleteMessages({
      queue,
      messages,
    });
  }

  @QueueConsumer({ key: 'local-queue', queue: 'local-queue', polling: 1000 })
  async createQueue(): Promise<IQueueConsumer.Pipeline> {
    return {
      receiveMessages: this.receiveMessages.bind(this),
      consumerMessages: this.consumerMessages.bind(this),
      deleteMessages: this.deleteMessages.bind(this),
    };
  }
}
