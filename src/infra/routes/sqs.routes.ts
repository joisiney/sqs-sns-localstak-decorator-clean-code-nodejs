import { awsCredentials } from '@/application/config/aws.config';
import { SQSController } from '@/infra/controller/sqs.controller';
import { SQSService } from '@/infra/service/sqs.service';
import { Router } from 'express';

const sqsRouter = Router();

// GLOBAL SERVICES
const service = new SQSService(awsCredentials);

// SQS CONTROLLER
const controller = new SQSController(service);

// SQS ROUTES
sqsRouter.post('/sqs/queue', controller.createQueue.bind(controller));
sqsRouter.get('/sqs/queues', controller.listQueue.bind(controller));
sqsRouter.get('/sqs/queue', controller.getQueue.bind(controller));
sqsRouter.delete('/sqs/queue', controller.deleteQueue.bind(controller));
sqsRouter.post(
  '/sqs/dispatch-message',
  controller.dispatchMessage.bind(controller),
);
sqsRouter.get(
  '/sqs/receive-messages',
  controller.receiveMessages.bind(controller),
);
sqsRouter.get(
  '/sqs/receive-messages-and-delete',
  controller.receiveMessagesAndDelete.bind(controller),
);
// EXPORTS
export { sqsRouter };
