import { awsCredentials } from '@/application/config/aws.config';
import { SNSController } from '@/infra/controller/sns/index.controller';
import { SQSController } from '@/infra/controller/sqs/index.controller';
import { SubscriptionController } from '@/infra/controller/subscription/index.controller';

import { TypeInjection, registerDependency } from '@/infra/decorator';
import { SNSSubscriptionService } from '@/infra/service/aws/sns-subscription.service';
import { SNSService } from '@/infra/service/aws/sns.service';
import { SQSService } from '@/infra/service/aws/sqs.service';
import Fastify, { FastifyInstance } from 'fastify';
import 'reflect-metadata';

const fastify: FastifyInstance = Fastify({ logger: false });

fastify.setErrorHandler(function (error, request, reply) {
  return reply.send(error);
});

registerDependency({
  services: [
    {
      key: 'SQS_SERVICE',
      type: TypeInjection.SINGLETON,
      handle: () => new SQSService(awsCredentials),
    },
    {
      key: 'SNS_SERVICE',
      type: TypeInjection.SINGLETON,
      handle: () => new SNSService(awsCredentials),
    },
    {
      key: 'SNS_SUBSCRIPTION_SERVICE',
      type: TypeInjection.SINGLETON,
      handle: () => new SNSSubscriptionService(awsCredentials),
    },
  ],
  controllers: [SQSController, SNSController, SubscriptionController],
  app: fastify,
});

fastify.listen({
  port: 3001,
});
