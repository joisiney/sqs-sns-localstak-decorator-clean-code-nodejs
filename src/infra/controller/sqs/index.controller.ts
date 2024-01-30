import { AbstractController } from '@/application/controller/abstract.controller';
import {
  CreateQueueDto,
  ICreateQueueDto,
} from '@/infra/controller/sqs/dto/create-queue.dto';
import {
  IListQueueDto,
  ListQueueDto,
} from '@/infra/controller/sqs/dto/list-queue.dto';

import { Controller, Inject, Route } from '@/infra/decorator';
import { SQSService } from '@/infra/service/aws/sqs.service';

@Controller('/sqs')
export class SQSController extends AbstractController {
  @Inject('SQS_SERVICE')
  public readonly sqsService: SQSService;

  @Route({ method: 'POST', url: '/queue', dto: CreateQueueDto })
  async createQueue(response: ICreateQueueDto): Promise<{ status: boolean }> {
    const status = await this.sqsService.createQueue(response);
    return { status };
  }

  @Route({ method: 'GET', url: '/queues', dto: ListQueueDto })
  async getQueues(response: IListQueueDto): Promise<{ queues: string[] }> {
    const queues = await this.sqsService.listQueue(response);
    return { queues };
  }
}
