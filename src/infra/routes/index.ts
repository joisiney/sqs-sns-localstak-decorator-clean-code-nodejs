import { awsCredentials } from '@/application/config/aws.config';
import { SQSMailController } from '@/infra/controller/sqs-mail.controller';
import { SQSProducerService } from '@/infra/service/sqs-producer.service';
import { Router } from 'express';

const router = Router();

// GLOBAL SERVICES
const sqsSendMailService = new SQSProducerService(
  'local-queue-send-mail',
  awsCredentials,
);

// SQS ROUTES
const sqsController = new SQSMailController(sqsSendMailService);

router.post('/create-queue', sqsController.createQueue.bind(sqsController));
router.post('/sqs-send-mail', sqsController.sendMail.bind(sqsController));

// EXPORTS
export { router };
