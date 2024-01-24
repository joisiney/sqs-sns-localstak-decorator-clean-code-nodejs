import { SNS } from '@aws-sdk/client-sns';
import { TopicArn, credentials } from './credentials.js';
const sns = new SNS(credentials);
async function publish(msg) {
  let topicRes;
  try {
    
    topicRes = await sns.publish({
      TopicArn,
      Message: msg
    });
  } catch (e) {
    topicRes = e;
  }
  console.log('TOPIC Response: ', topicRes);
}
for (let i = 0; i < 5; i++) {
  publish(`Mensagem de estudo indice "${i}"`);
}