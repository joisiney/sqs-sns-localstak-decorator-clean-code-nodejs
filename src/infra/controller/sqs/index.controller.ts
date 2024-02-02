import { AbstractController } from '@/application/controller/abstract.controller';
import { IQueueService } from '@/application/service/queue.service';
import {
  DispatchMessageDto,
  IDispatchMessageDto,
} from '@/infra/controller/sqs/dto/dispatch-message.dto';
import { IQueueDto, QueueDto } from '@/infra/controller/sqs/dto/queue-name.dto';

import { Controller, Inject, Route } from '@/infra/decorator';

@Controller('/sqs')
export class SQSController extends AbstractController {
  @Inject('SQS_SERVICE')
  public readonly sqsService: IQueueService.Implements;

  @Route({ method: 'POST', url: '/queue', dto: QueueDto })
  async createQueue(response: IQueueDto): Promise<{ status: boolean }> {
    const status = await this.sqsService.createQueue(response);
    return { status };
  }

  @Route({ method: 'GET', url: '/queues', dto: QueueDto })
  async listQueues(response: IQueueDto): Promise<{ queues: string[] }> {
    const queues = await this.sqsService.listQueue(response);
    return { queues };
  }

  @Route({ method: 'GET', url: '/queue', dto: QueueDto })
  async getQueues(response: IQueueDto): Promise<{ queue?: string }> {
    const queue = await this.sqsService.getQueueUrl(response);
    return { queue };
  }

  @Route({ method: 'DELETE', url: '/queue', dto: QueueDto })
  async deleteQueue(response: IQueueDto): Promise<{ queue: boolean }> {
    const queue = await this.sqsService.deleteQueue(response);
    return { queue };
  }

  @Route({
    method: 'POST',
    url: '/dispatch-message',
    dto: DispatchMessageDto,
  })
  async dispatchMessage(
    response: IDispatchMessageDto,
  ): Promise<{ sent: boolean }> {
    const sent = await this.sqsService.dispatchMessage(response);
    return { sent };
  }

  @Route({
    method: 'GET',
    url: '/receive-messages',
    dto: QueueDto,
  })
  async receiveMessages(
    response: IQueueDto,
  ): Promise<{ messages: IQueueService.Message[] }> {
    const messages = await this.sqsService.receiveMessages({
      ...response,
      messageAttributesNames: ['name', 'age', 'isActived'],
    });
    return { messages };
  }

  @Route({
    method: 'GET',
    url: '/receive-messages-and-delete',
    dto: QueueDto,
  })
  async receiveAndDeleteMessages(
    response: IQueueDto,
  ): Promise<{ messages: IQueueService.Message[] }> {
    const messages = await this.sqsService.receiveMessages({
      ...response,
      messageAttributesNames: ['name', 'age', 'isActived'],
    });

    await this.sqsService.deleteMessages({
      ...response,
      messages,
    });
    return { messages };
  }
}
