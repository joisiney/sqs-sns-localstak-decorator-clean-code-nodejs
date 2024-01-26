import {
  DeleteMessageCommand,
  GetQueueUrlCommand,
  ReceiveMessageCommand,
  SQSClient,
} from '@aws-sdk/client-sqs';
import { QueueName, credentials } from './credentials.js';
// Crie um cliente SQS
const sqsClient = new SQSClient(credentials);

// Obtenha a URL da fila
const { QueueUrl } = await sqsClient.send(
  new GetQueueUrlCommand({ QueueName }),
);

const receiveMessageCommand = new ReceiveMessageCommand({
  QueueUrl,
  MaxNumberOfMessages: 1,
  WaitTimeSeconds: 5,
  AttributeNames: ['All'],
  MessageAttributeNames: ['Phone', 'Author', 'Email'],
});

const pollMessages = async () => {
  const data = await sqsClient.send(receiveMessageCommand);

  if (data.Messages) {
    data.Messages.forEach(async (message) => {
      await sqsClient.send(
        new DeleteMessageCommand({
          QueueUrl,
          ReceiptHandle: message.ReceiptHandle,
        }),
      );
    });
  }
};

pollMessages();
