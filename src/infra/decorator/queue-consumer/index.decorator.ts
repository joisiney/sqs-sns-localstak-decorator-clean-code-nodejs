import { stackErrorParse } from '@/application/util/parse/stack-error.parse';
import { IQueueConsumer } from '@/infra/decorator/queue-consumer/index.dto';

const timers = {} as { [key: string]: NodeJS.Timeout };

export function QueueConsumer({
  key,
  queue,
  polling = 1000,
  maxErrorSequence = 60,
}: IQueueConsumer.Props) {
  let awaitError = 1;
  if (timers[key]) clearTimeout(timers[key]);
  return function (target: any, propertyKey: string, descriptor: any) {
    const originalMethod = descriptor.value;

    if (!originalMethod) {
      throw new Error(`Method ${propertyKey} is not defined`);
    }

    const handlerPolling = async (): Promise<void> => {
      try {
        const { receiveMessages, consumerMessages, deleteMessages } =
          (await originalMethod.bind(target)()) as IQueueConsumer.Pipeline;
        const messages = await receiveMessages({ queue });
        if (messages && messages.length > 0) {
          await consumerMessages({ queue, messages });
          await deleteMessages({ queue, messages });
        }
        awaitError = 1;
        timers[key] = setTimeout(handlerPolling, polling);
      } catch (err) {
        awaitError++;
        if (awaitError <= maxErrorSequence) {
          timers[key] = setTimeout(handlerPolling, polling * awaitError);
        }
        console.error({
          code: 400,
          status: 'BadRequestException',
          key,
          queue,
          polling,
          propertyKey,
          target: target.constructor.name,
          stack: stackErrorParse((err as any).stack),
        });
      }
    };

    setTimeout(handlerPolling, polling);
    return descriptor;
  };
}
