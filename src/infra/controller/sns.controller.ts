import { SNSService } from '@/infra/service/sns.service';
import { Request, Response } from 'express';

export class SNSController {
  private topic = 'local-topic';
  constructor(private readonly snsService: SNSService) {}

  async createTopic(request: Request, response: Response) {
    const output = await this.snsService.createTopic({
      topic: this.topic,
    });
    return response.status(output ? 201 : 400).json({
      status: true,
      method: 'createTopic',
      message: 'ok',
      id: Math.floor(Math.random() * 100) + 1,
      data: output,
    });
  }

  async listTopics(request: Request, response: Response) {
    const output = await this.snsService.listTopics();
    return response.status(output ? 201 : 400).json({
      status: true,
      method: 'listTopics',
      message: 'ok',
      id: Math.floor(Math.random() * 100) + 1,
      data: output,
    });
  }

  async deleteTopic(request: Request, response: Response) {
    const output = await this.snsService.deleteTopic({
      topic: this.topic,
    });

    return response.status(output ? 201 : 400).json({
      status: true,
      method: 'listTopics',
      message: 'ok',
      id: Math.floor(Math.random() * 100) + 1,
      data: output,
    });
  }

  async getTopic(request: Request, response: Response) {
    const output = await this.snsService.getTopic({
      topic: this.topic,
    });

    return response.status(output ? 201 : 400).json({
      status: true,
      method: 'getTopic',
      message: 'ok',
      id: Math.floor(Math.random() * 100) + 1,
      data: output,
    });
  }
}
