import { SQSService } from '@/infra/service/aws/sqs.service';

export class SQSController {
  private queue = 'local-queue';
  constructor(private readonly sqsService: SQSService) {}

  async createQueue(_: IFastifyRequest, reply: IFastifyReply): IFastifyReturn {
    console.log('ola mundo');
    const output = await this.sqsService.createQueue({
      queue: this.queue,
    });
    return reply.send({
      status: true,
      method: 'createQueue',
      message: 'ok',
      id: Math.floor(Math.random() * 100) + 1,
      data: output,
    });
  }

  async listQueue(_: IFastifyRequest, reply: IFastifyReply): IFastifyReturn {
    const output = await this.sqsService.listQueue({
      queue: this.queue,
    });
    return reply.send({
      status: true,
      method: 'listQueue',
      message: 'ok',
      id: Math.floor(Math.random() * 100) + 1,
      data: output,
    });
  }

  async getQueue(_: IFastifyRequest, reply: IFastifyReply): IFastifyReturn {
    const output = await this.sqsService.getQueue({
      queue: this.queue,
    });
    return reply.send({
      status: true,
      method: 'getQueue',
      message: 'ok',
      id: Math.floor(Math.random() * 100) + 1,
      data: output,
    });
  }

  async deleteQueue(_: IFastifyRequest, reply: IFastifyReply): IFastifyReturn {
    const output = await this.sqsService.deleteQueue({
      queue: this.queue,
    });
    return reply.send({
      status: true,
      method: 'deleteQueue',
      message: 'ok',
      id: Math.floor(Math.random() * 100) + 1,
      data: output,
    });
  }

  async dispatchMessage(
    _: IFastifyRequest,
    reply: IFastifyReply,
  ): IFastifyReturn {
    const output = await this.sqsService.dispatchMessage({
      queue: this.queue,
      message: 'Welcome to the system',
      messageAttributes: {
        name: 'John Doe',
        age: 20,
        isActived: true,
      },
    });

    return reply.send({
      status: true,
      method: 'dispatchMessage',
      id: Math.floor(Math.random() * 100) + 1,
      message: 'ok',
      data: output,
    });
  }

  async receiveMessages(
    _: IFastifyRequest,
    reply: IFastifyReply,
  ): IFastifyReturn {
    const output = await this.sqsService.receiveMessages({
      queue: this.queue,
      messageAttributesNames: ['name', 'age', 'isActived'],
    });
    return reply.send({
      status: true,
      method: 'receiveMessages',
      message: 'ok',
      id: Math.floor(Math.random() * 100) + 1,
      data: output,
    });
  }

  async receiveMessagesAndDelete(
    _: IFastifyRequest,
    reply: IFastifyReply,
  ): IFastifyReturn {
    const messages = await this.sqsService.receiveMessages({
      queue: this.queue,
      messageAttributesNames: ['name', 'age', 'isActived'],
    });

    await this.sqsService.deleteMessages({
      queue: this.queue,
      messages,
    });
    return reply.send({
      status: true,
      method: 'receiveMessagesAndDelete',
      message: 'ok',
      id: Math.floor(Math.random() * 100) + 1,
      data: messages,
    });
  }
}
