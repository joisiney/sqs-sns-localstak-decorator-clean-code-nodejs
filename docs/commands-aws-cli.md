```bash
aws sns create-topic \
--endpoint-url http://localhost:4566 \
--region us-east-1 \
--name local-topic
```

- Listando todos os tópicos SNS

```bash
aws sns list-topics \
--endpoint-url http://localhost:4566 \
--region us-east-1
```

- Deletando tópico SNS

```bash
aws sns delete-topic \
--endpoint-url http://localhost:4566 \
--topic-arn arn:aws:sns:us-east-1:000000000000:local-topic
```

- Inscrevendo um tópico SNS em uma fila SQS (Tem que criar a fila antes de
  inscrever)

```bash
aws sns subscribe \
--endpoint-url http://localhost:4566 \
--region us-east-1 \
--topic-arn arn:aws:sns:us-east-1:000000000000:local-topic \
--protocol sqs \
--notification-endpoint arn:aws:sqs:us-east-1:000000000000:local-queue
```

```bash
aws sns list-subscriptions-by-topic \
--endpoint-url http://localhost:4566 \
--region us-east-1 \
--topic-arn arn:aws:sns:us-east-1:000000000000:local-topic
```

- Criando uma fila SQS

```bash
aws sqs create-queue \
--endpoint-url http://localhost:4566 \
--region us-east-1 \
--queue-name local-queue
```

- Recebendo mensagem de uma fila SQS

```bash
aws sqs receive-message \
--endpoint-url http://localhost:4566 \
--region us-east-1 \
--queue-url http://localhost:4566/000000000000/local-queue
```

- Deletando mensagem de uma fila SQS através do receipt-handle

```bash
aws sqs delete-message \
--endpoint-url http://localhost:4566 \
--region us-east-1 \
--queue-url http://localhost:4566/000000000000/local-queue \
--receipt-handle Y2I3NzE2MzMtMmFmNi00ZTYyLWJkMzUtMGFjNDEwMDdhZmNmIGFybjphd3M6c3FzOnVzLWVhc3QtMTowMDAwMDAwMDAwMDA6bG9jYWwtcXVldWUgZjExYmUyMDItZjkyZi00NGZlLWIwOGItYTU0M2ExNmE2MTgwIDE3MDU5NzA5MDAuODMxNjY1
```

-- Deletando todas as mensagens de uma fila SQS

```bash
aws sqs purge-queue \
--endpoint-url http://localhost:4566 \
--region us-east-1 \
--queue-url http://localhost:4566/000000000000/local-queue
```

- Listando todas as filas SQS

```bash
aws sqs list-queues \
--endpoint-url http://localhost:4566 \
--region us-east-1
```

- Deletando uma fila SQS

```bash
aws sqs delete-queue \
--endpoint-url http://localhost:4566 \
--queue-url http://localhost:4566/000000000000/local-queue
```

- Extraindo a URL da fila SQS

```bash
aws sqs list-queues \
--endpoint-url http://localhost:4566 \
--region us-east-1 \
--queue-name local-queue \
--query 'QueueUrls' \
--output text
```

```bash
aws sqs get-queue-attributes \
--endpoint-url http://localhost:4566 \
--region us-east-1 \
--queue-url http://localhost:4566/000000000000/local-queue \
--attribute-names QueueArn
```
