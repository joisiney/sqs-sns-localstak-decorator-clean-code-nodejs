import { IAWSCredentials } from '@/application/config/aws.config';
import { BadRequestException } from '@/application/exceptions';
import { IQueueTopic } from '@/application/service/queue-topic.service';
import {
  CreateTopicCommand,
  DeleteTopicCommand,
  ListTopicsCommand,
  SNSClient,
} from '@aws-sdk/client-sns';

export class SNSService implements IQueueTopic.Implements {
  private readonly snsClient: SNSClient;
  private memoryTopicUrl: { [key: string]: string } = {};

  constructor(credentials: IAWSCredentials) {
    this.snsClient = new SNSClient(credentials);
  }

  async createTopic(props: IQueueTopic.Topic): Promise<string> {
    const isExists = await this.hasTopic(props);
    if (isExists) {
      throw new BadRequestException('Topic already exists');
    }

    const response = await this.snsClient.send(
      new CreateTopicCommand({ Name: props.topic }),
    );

    if (!response.TopicArn) {
      throw new BadRequestException('Topic not created');
    }

    return response.TopicArn;
  }

  async listTopics(): Promise<string[]> {
    const response = await this.snsClient.send(new ListTopicsCommand({}));
    if (!response.Topics) {
      throw new BadRequestException('Topics not found');
    }
    return response.Topics.map((topic) => topic.TopicArn).filter(
      Boolean,
    ) as string[];
  }

  async deleteTopic(props: IQueueTopic.Topic): Promise<boolean> {
    const TopicArn = await this.getTopic(props);
    if (!TopicArn) {
      throw new BadRequestException('Topic not found');
    }
    const response = await this.snsClient.send(
      new DeleteTopicCommand({ TopicArn }),
    );
    if (!response.$metadata.httpStatusCode) {
      throw new BadRequestException('Topic not deleted');
    }
    if (this.memoryTopicUrl[props.topic]) {
      delete this.memoryTopicUrl[props.topic];
    }
    return true;
  }

  async getTopic(props: IQueueTopic.Topic): Promise<string> {
    if (this.memoryTopicUrl[props.topic]) {
      return this.memoryTopicUrl[props.topic];
    }
    const data = await this.listTopics();
    const topic = data.find((topic) => topic.endsWith(`:${props.topic}`));
    if (!topic) {
      throw new BadRequestException('Topic not found');
    }
    this.memoryTopicUrl[props.topic] = topic;
    return topic;
  }

  async hasTopic(props: IQueueTopic.Topic): Promise<boolean> {
    const response = await this.getTopic(props).catch(() => false);
    return !!response;
  }
}
