import { awsCredentials } from '@/application/config/aws.config';
import { SNSController } from '@/infra/controller/sns.controller';
import { SNSService } from '@/infra/service/sns.service';
import { Router } from 'express';

const snsRouter = Router();

// GLOBAL SERVICES
const service = new SNSService(awsCredentials);

// SNS CONTROLLER
const controller = new SNSController(service);

// SNS ROUTES
snsRouter.post('/sns/topic', controller.createTopic.bind(controller));
snsRouter.get('/sns/topics', controller.listTopics.bind(controller));
snsRouter.get('/sns/topic', controller.getTopic.bind(controller));
snsRouter.delete('/sns/topic', controller.deleteTopic.bind(controller));
export { snsRouter };
