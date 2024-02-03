import { awsCredentials } from '@/application/config/aws.config';
import { SNSController } from '@/infra/controller/sns/index.controller';
import { SQSController } from '@/infra/controller/sqs/index.controller';
import { SubscriptionController } from '@/infra/controller/subscription/index.controller';

import { TypeInjection, registerDependency } from '@/infra/decorator';
import { QueueConsumerService } from '@/infra/service/aws/queue-consumer.service';
import { SNSSubscriptionService } from '@/infra/service/aws/sns-subscription.service';
import { SNSService } from '@/infra/service/aws/sns.service';
import { SQSService } from '@/infra/service/aws/sqs.service';
import { logsRoutes } from '@/infra/util/logs.routes';
import { SNSClient } from '@aws-sdk/client-sns';
import { SQSClient } from '@aws-sdk/client-sqs';
import Fastify, { FastifyInstance } from 'fastify';
import 'reflect-metadata';

const app: FastifyInstance = Fastify({ logger: false });

app.setErrorHandler(function (error, request, reply) {
  return reply.send(error);
});

const sqsClient = new SQSClient(awsCredentials);
const snsClient = new SNSClient(awsCredentials);
registerDependency({
  services: [
    {
      key: 'SQS_SERVICE',
      type: TypeInjection.SINGLETON,
      handle: () => new SQSService(sqsClient),
    },
    {
      key: 'SNS_SERVICE',
      type: TypeInjection.SINGLETON,
      handle: () => new SNSService(snsClient),
    },
    {
      key: 'SNS_SUBSCRIPTION_SERVICE',
      type: TypeInjection.SINGLETON,
      handle: () => new SNSSubscriptionService(snsClient),
    },
    {
      key: 'QUEUE_CONSUMER_SERVICE',
      type: TypeInjection.SINGLETON,
      handle: () => {
        return new QueueConsumerService();
      },
    },
  ],
  controllers: [SQSController, SNSController, SubscriptionController],
  app,
});

app.listen(
  {
    port: 3001,
  },
  (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    logsRoutes(`Server listening at ${address} 🚀🚀`);
  },
);
