import { SNSService } from '@/infra/service/aws/sns.service';

export class SNSController {
  private topic = 'local-topic';
  constructor(private readonly snsService: SNSService) {}

  async createTopic(_: IFastifyRequest, reply: IFastifyReply): IFastifyReturn {
    const output = await this.snsService.createTopic({
      topic: this.topic,
    });
    return reply.send({
      status: true,
      method: 'createTopic',
      message: 'ok',
      id: Math.floor(Math.random() * 100) + 1,
      data: output,
    });
  }

  async listTopics(_: IFastifyRequest, reply: IFastifyReply): IFastifyReturn {
    const output = await this.snsService.listTopics();
    return reply.send({
      status: true,
      method: 'listTopics',
      message: 'ok',
      id: Math.floor(Math.random() * 100) + 1,
      data: output,
    });
  }

  async deleteTopic(_: IFastifyRequest, reply: IFastifyReply): IFastifyReturn {
    const output = await this.snsService.deleteTopic({
      topic: this.topic,
    });

    return reply.send({
      status: true,
      method: 'listTopics',
      message: 'ok',
      id: Math.floor(Math.random() * 100) + 1,
      data: output,
    });
  }

  async getTopic(_: IFastifyRequest, reply: IFastifyReply): IFastifyReturn {
    const output = await this.snsService.getTopic({
      topic: this.topic,
    });

    return reply.send({
      status: true,
      method: 'getTopic',
      message: 'ok',
      id: Math.floor(Math.random() * 100) + 1,
      data: output,
    });
  }
}
