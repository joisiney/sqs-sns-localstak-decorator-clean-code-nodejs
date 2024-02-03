import { IQueueService } from '@/application/service/queue.service';

export namespace IQueueConsumer {
  export type Props = {
    key: string;
    queue: string;
    polling?: number;
    maxErrorSequence?: number;
  };
  export type InternalProps = {
    queue: string;
    messages: IQueueService.Message[];
  };
  export type Pipeline = {
    receiveMessages(
      props: Pick<InternalProps, 'queue'>,
    ): Promise<IQueueService.Message[]>;
    consumerMessages(props: InternalProps): Promise<void>;
    deleteMessages(props: InternalProps): Promise<void>;
  };
}
