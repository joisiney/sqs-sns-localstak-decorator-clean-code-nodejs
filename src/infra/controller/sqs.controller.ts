import { SQSService } from '@/infra/service/sqs.service';
import { Request, Response } from 'express';

export class SQSController {
  private queue = 'local-queue';
  constructor(private readonly sqsService: SQSService) {}

  async dispatchMessage(request: Request, response: Response) {
    const output = await this.sqsService.dispatchMessage({
      queue: this.queue,
      message: 'Welcome to the system',
      messageAttributes: {
        name: 'John Doe',
        age: 20,
        isActived: true,
      },
    });

    return response.status(output ? 201 : 400).json({
      status: true,
      method: 'dispatchMessage',
      id: Math.floor(Math.random() * 100) + 1,
      message: 'ok',
    });
  }

  async receiveMessages(request: Request, response: Response) {
    const output = await this.sqsService.receiveMessages({
      queue: this.queue,
      messageAttributesNames: ['name', 'age', 'isActived'],
    });
    return response.status(200).json({
      status: true,
      method: 'receiveMessages',
      message: 'ok',
      id: Math.floor(Math.random() * 100) + 1,
      data: output,
    });
  }

  async receiveMessagesAndDelete(request: Request, response: Response) {
    const messages = await this.sqsService.receiveMessages({
      queue: this.queue,
      messageAttributesNames: ['name', 'age', 'isActived'],
    });

    await this.sqsService.deleteMessages({
      queue: this.queue,
      messages,
    });
    return response.status(200).json({
      status: true,
      method: 'receiveMessagesAndDelete',
      message: 'ok',
      id: Math.floor(Math.random() * 100) + 1,
      data: messages,
    });
  }

  async createQueue(request: Request, response: Response) {
    const output = await this.sqsService.createQueue({
      queue: this.queue,
    });
    return response.status(output ? 201 : 400).json({
      status: true,
      method: 'createQueue',
      message: 'ok',
      id: Math.floor(Math.random() * 100) + 1,
      data: output,
    });
  }

  async listQueue(request: Request, response: Response) {
    const output = await this.sqsService.listQueue({
      queue: this.queue,
    });
    return response.status(200).json({
      status: true,
      method: 'listQueue',
      message: 'ok',
      id: Math.floor(Math.random() * 100) + 1,
      data: output,
    });
  }

  async deleteQueue(request: Request, response: Response) {
    const output = await this.sqsService.deleteQueue({
      queue: this.queue,
    });
    return response.status(200).json({
      status: true,
      method: 'deleteQueue',
      message: 'ok',
      id: Math.floor(Math.random() * 100) + 1,
      data: output,
    });
  }

  async getQueue(request: Request, response: Response) {
    const output = await this.sqsService.getQueue({
      queue: this.queue,
    });
    return response.status(200).json({
      status: true,
      method: 'getQueue',
      message: 'ok',
      id: Math.floor(Math.random() * 100) + 1,
      data: output,
    });
  }
}
