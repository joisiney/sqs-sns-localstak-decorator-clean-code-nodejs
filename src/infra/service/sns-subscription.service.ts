import { IQueueTopic } from '@/application/service/queue-topic.service';
import { IQueueService } from '@/application/service/queue.service';

export class SNSSubscriptionService {
  constructor(
    private readonly sqsService: IQueueService.Implements,
    private readonly snsService: IQueueTopic.Implements,
  ) {}

  async subscription(props: {
    queue: string;
    topic: string;
  }): Promise<boolean> {
    try {
      const [topicArn, queueUrl] = await Promise.all([
        this.snsService.getTopic({ topic: props.topic }),
        this.sqsService.getQueue({ queue: props.queue }),
      ]);

      if (!topicArn || !queueUrl) {
        return false;
      }

      await this.snsService.subscription({
        topicArn,
        queueUrl,
      });

      return true;
    } catch {
      return false;
    }
  }
}
