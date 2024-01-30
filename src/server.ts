import { awsCredentials } from '@/application/config/aws.config';
import { SQSController } from '@/infra/controller/sqs/index.controller';

import { TypeInjection, registerDependency } from '@/infra/decorator';
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
  ],
  controllers: [SQSController],
  app: fastify,
});

fastify.listen({
  port: 3001,
});
