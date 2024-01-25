import { SQSProducerService } from '@/infra/service/sqs-producer.service';
import { Request, Response } from 'express';

export class SQSMailController {
  private queueName = 'local-queue-send-mail';
  constructor(private readonly sqsSendMailService: SQSProducerService) {}

  async dispatchMessage(request: Request, response: Response) {
    const output = await this.sqsSendMailService.dispatchMessage({
      QueueName: this.queueName,
      message: 'Welcome to the system',
      messageAttributes: {
        name: 'John Doe',
        age: 20,
        isActived: true,
      },
    });

    return response
      .status(output ? 201 : 400)
      .json({ status: true, message: 'ok' });
  }

  async receiveMessages(request: Request, response: Response) {
    const output = await this.sqsSendMailService.receiveMessages({
      QueueName: this.queueName,
      messageAttributesNames: ['name', 'age', 'isActived'],
    });
    return response
      .status(200)
      .json({ status: true, message: 'ok', data: output });
  }

  async receiveMessagesAndDelete(request: Request, response: Response) {
    const messages = await this.sqsSendMailService.receiveMessages({
      QueueName: this.queueName,
      messageAttributesNames: ['name', 'age', 'isActived'],
    });

    await this.sqsSendMailService.deleteMessages({
      QueueName: this.queueName,
      messages,
    });
    return response
      .status(200)
      .json({ status: true, message: 'ok', data: messages });
  }

  async createQueue(request: Request, response: Response) {
    const output = await this.sqsSendMailService.createQueue({
      QueueName: this.queueName,
    });
    return response
      .status(output ? 201 : 400)
      .json({ status: true, message: 'ok', data: output });
  }

  async listQueue(request: Request, response: Response) {
    const output = await this.sqsSendMailService.listQueue({
      QueueName: this.queueName,
    });
    return response
      .status(200)
      .json({ status: true, message: 'ok', data: output });
  }

  async deleteQueue(request: Request, response: Response) {
    const output = await this.sqsSendMailService.deleteQueue({
      QueueName: this.queueName,
    });
    return response
      .status(200)
      .json({ status: true, message: 'ok', data: output });
  }

  async getQueue(request: Request, response: Response) {
    const output = await this.sqsSendMailService.getQueue({
      QueueName: this.queueName,
    });
    return response
      .status(200)
      .json({ status: true, message: 'ok', data: output });
  }
}
