import { AbstractController } from '@/application/controller/abstract.controller';
import { IQueueTopic } from '@/application/service/queue-topic.service';
import { ITopicDto, TopicDto } from '@/infra/controller/sns/dto/topic-name.dto';

import { Controller, Inject, Route } from '@/infra/decorator';

@Controller('/sns')
export class SNSController extends AbstractController {
  @Inject('SNS_SERVICE')
  public readonly snsService: IQueueTopic.Implements;

  @Route({ method: 'POST', url: '/topic', dto: TopicDto })
  async createTopic(response: ITopicDto): Promise<{ status: string }> {
    const status = await this.snsService.createTopic(response);
    return { status };
  }

  @Route({ method: 'GET', url: '/topics' })
  async listTopics(): Promise<{ topics: string[] }> {
    const topics = await this.snsService.listTopics();
    return { topics };
  }

  @Route({ method: 'GET', url: '/topic', dto: TopicDto })
  async getTopics(response: ITopicDto): Promise<{ topic: string }> {
    const topic = await this.snsService.getTopic(response);
    return { topic };
  }

  @Route({ method: 'DELETE', url: '/topic', dto: TopicDto })
  async deleteTopic(response: ITopicDto): Promise<{ topic: boolean }> {
    const topic = await this.snsService.deleteTopic(response);
    return { topic };
  }
}
