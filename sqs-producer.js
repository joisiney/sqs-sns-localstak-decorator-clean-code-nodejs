import { GetQueueUrlCommand, SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import { QueueName, credentials } from './credentials.js';

const sqsClient = new SQSClient(credentials);
const sendMessageToQueue = async (MessageBody) => {
    try {
        // Obtenha a URL da fila
        const {QueueUrl} = await sqsClient.send(new GetQueueUrlCommand({QueueName}));
        const command = new SendMessageCommand({
            MessageBody,
            QueueUrl,
            MessageAttributes: {
                Phone: {
                    DataType: "String",
                    StringValue: "62 3097.2656",
                },
                Author: {
                    DataType: "String",
                    StringValue: "Joisiney",
                },
                Email: {
                    DataType: "Number",
                    StringValue: "contato@sitiodigital.com.br",
                },
            },
        });
        
        const response = await sqsClient.send(command);
        console.log('sendMessageToQueue/success', response);
    }catch (error) {
        const { requestId, cfId, extendedRequestId } = error.$metadata;
        console.error({ requestId, cfId, extendedRequestId });
    }
}
sendMessageToQueue('SD Soluções Interativas')