import { awsCredentials } from '@/application/config/aws.config';
import { SQSMailController } from '@/infra/controller/sqs-mail.controller';
import { SQSProducerService } from '@/infra/service/sqs-producer.service';
import { Router } from 'express';

const sqsRouter = Router();

// GLOBAL SERVICES
const sqsSendMailService = new SQSProducerService(awsCredentials);

// SQS CONTROLLER
const sqsController = new SQSMailController(sqsSendMailService);

// SQS ROUTES
sqsRouter.post('/queue', sqsController.createQueue.bind(sqsController));
sqsRouter.get('/queues', sqsController.listQueue.bind(sqsController));
sqsRouter.get('/queue', sqsController.getQueue.bind(sqsController));
sqsRouter.delete('/queue', sqsController.deleteQueue.bind(sqsController));
sqsRouter.post(
  '/dispatch-message',
  sqsController.dispatchMessage.bind(sqsController),
);
sqsRouter.get(
  '/receive-messages',
  sqsController.receiveMessages.bind(sqsController),
);
sqsRouter.get(
  '/receive-messages-and-delete',
  sqsController.receiveMessagesAndDelete.bind(sqsController),
);
// EXPORTS
export { sqsRouter };
