import { awsCredentials } from '@/application/config/aws.config';
import { SNSSubscriptionController } from '@/infra/controller/sns-subscription.controller';
import { SNSSubscriptionService } from '@/infra/service/sns-subscription.service';
import { SNSService } from '@/infra/service/sns.service';
import { SQSService } from '@/infra/service/sqs.service';
import { Router } from 'express';

const snsSubscriptionRouter = Router();

// GLOBAL SERVICES
const snsService = new SNSService(awsCredentials);
const sqsService = new SQSService(awsCredentials);
const snsSuscriptionService = new SNSSubscriptionService(
  sqsService,
  snsService,
);

// SNS CONTROLLER
const controller = new SNSSubscriptionController(snsSuscriptionService);

// SNS ROUTES
snsSubscriptionRouter.post(
  '/sns/subscription/sqs',
  controller.subscription.bind(controller),
);

export { snsSubscriptionRouter };
