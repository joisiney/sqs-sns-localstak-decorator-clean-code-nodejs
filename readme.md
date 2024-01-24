# NODEJS + LOCALSTACK + SNS + SQS
Simples POCK para demostrar como utilizar o Localstack para simular o SNS e SQS.

# Documentação
[Link oficial](https://github.com/localstack/localstack)

# Iniciar Localstack com Docker Compose
O arquivo docker-compose.yml contém a configuração necessária para iniciar o Localstack com os serviços SNS e SQS.
Para inicializar o Localstack, execute o comando abaixo:
```bash
docker-compose up -d
```

# Usando Localstack
Seguindo nosso tutorial, agora com o Localstack em execução, vamos realizar o primeiro teste, criando um Bucket no S3 usando o AWS CLI. Se você ainda não tem ele instalado, pode baixar aqui o [AWS CLI](https://aws.amazon.com/pt/cli/).

Vamos lá, digite no seu terminal o seguinte comando:
```bash
# Criar um bucket
aws --endpoint-url=http://localhost:4566 s3 mb s3://test

# Listar todos os buckets
aws --endpoint-url=http://localhost:4566 s3 ls
``````
O resultado será um bucket criado e depois a listagem de buckets.

# Configuração do nodejs
-- Não se esqueça de adicionar `"type": "module" em seu `package.json` para utilizar o import de pacodes em vez de required.

# Usando Localstack
- Atualize o localstack para a versão mais recente, a vesão antiga não funciona.
  - `docker pull localstack/localstack:latest`
- Configure as credenciais de acesso do localstack
  - `aws configure --profile localstack`
    - Preencha as informações solicitadas:
    - AWS Access Key ID: S3RVER
    - AWS Secret Access Key: S3RVER
    - Default region name: us-east-1
    - Default output format: json
- O arquivo sns-publisher.js publica uma mensagem no SNS.
- O arquivo sqs-consumer.js consome a mensagem do SQS.

# Referencias de estudos
- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html)
- [AWS GIT](https://github.com/awsdocs/aws-doc-sdk-examples/tree/main/javascriptv3/example_code)
- [danieldcs](https://danieldcs.com/simulando-aws-local-com-localstack-e-node-js)
- [pulse](https://www.linkedin.com/pulse/desenvolvimento-de-aplica%C3%A7%C3%B5es-serverless-locais-uma-vis%C3%A3o-tiago-silva/?originalSubdomain=pt)
- (Vídeo aula SQS)[https://www.youtube.com/watch?v=b0_NFzdPkDo]
(Secret Manager)[https://www.google.com/search?sca_esv=600777061&sxsrf=ACQVn08PIjRyOUeTzGZsmjMp2uyBrDsZKA:1706028741285&q=localstack+secretsmanager+Nodejs&tbm=vid&source=lnms&prmd=svinbmtz&sa=X&ved=2ahUKEwiTgOeo_PODAxW8ppUCHeADBWcQ0pQJegQIDxAB&biw=1512&bih=823&dpr=2#fpstate=ive&vld=cid:3191bdd3,vid:NiKSdX_eitU,st:0]


- Criando tópico SNS
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

- Inscrevendo um tópico SNS em uma fila SQS (Tem que criar a fila antes de inscrever)
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
``````

- Extraindo a URL da fila SQS
```bash
aws sqs list-queues \
--endpoint-url http://localhost:4566 \
--region us-east-1 \
--queue-name local-queue \
--query 'QueueUrls' \
--output text
``````


```bash
aws sqs get-queue-attributes \
--endpoint-url http://localhost:4566 \
--region us-east-1 \
--queue-url http://localhost:4566/000000000000/local-queue \
--attribute-names QueueArn
``````


# Setup express
```bash
yarn add express
yarn add typescript @types/express tsx -D
npx tsc --init
```

# Salvando credenciais do localstack
```bash
aws configure --profile localstack
```

# Local onde as credenciais são salvas
```bash
ls ~/.aws
```



https://www.npmjs.com/package/sqs-consumer