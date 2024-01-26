import { SNSSubscriptionService } from '@/infra/service/sns-subscription.service';
import { Request, Response } from 'express';

export class SNSSubscriptionController {
  private topic = 'local-topic';
  private queue = 'local-queue';
  constructor(
    private readonly snsSubscriptionService: SNSSubscriptionService,
  ) {}

  async subscription(request: Request, response: Response) {
    const output = await this.snsSubscriptionService.subscription({
      topic: this.topic,
      queue: this.queue,
    });
    return response.status(output ? 201 : 400).json({
      status: true,
      method: 'subscription',
      message: 'ok',
      id: Math.floor(Math.random() * 100) + 1,
      data: output,
    });
  }
}
