import { SNSSubscriptionService } from '@/infra/service/aws/sns-subscription.service';

export class SNSSubscriptionController {
  private topic = 'local-topic';
  private queue = 'local-queue';
  constructor(
    private readonly snsSubscriptionService: SNSSubscriptionService,
  ) {}

  async subscription(_: IFastifyRequest, reply: IFastifyReply): IFastifyReturn {
    const output = await this.snsSubscriptionService.subscription({
      topic: this.topic,
      queue: this.queue,
    });
    return reply.send({
      status: true,
      method: 'subscription',
      message: 'ok',
      id: Math.floor(Math.random() * 100) + 1,
      data: output,
    });
  }
}
