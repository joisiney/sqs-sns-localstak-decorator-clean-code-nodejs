import { SQSProducerService } from '@/infra/service/sqs-producer.service';
import { Request, Response } from 'express';

export class SQSMailController {
  constructor(private readonly sqsSendMailService: SQSProducerService) {}
  async sendMail(request: Request, response: Response) {
    const output = await this.sqsSendMailService.dispatchMessage({
      message: 'Mensage,',
      attributes: {
        name: 'teste',
        email: 'teste@teste.com',
        body: 'teste',
      },
    });

    return response
      .status(output ? 201 : 400)
      .json({ status: true, message: 'ok' });
  }
  async createQueue(request: Request, response: Response) {
    const output = await this.sqsSendMailService.createQueue();
    return response
      .status(output ? 201 : 400)
      .json({ status: true, message: 'ok', data: output });
  }
}
