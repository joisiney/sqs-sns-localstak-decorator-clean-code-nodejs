# Node.js + LocalStack + SNS + SQS + Fastify.js + CleanCode + Decorator + Dependency Inversion

**Serviços de Gerenciamento e consumo de Filas e Tópicos SNS em Ambiente
Docker/LocalStack com Fastify, Clean Code e Injeção de Dependências utilizando
decorators**

# Embarque na Jornada do Decorator Partner

Este é uma POC me aventurando na terra do Decorator Partner, onde o Clean Code é
a norma e o gerenciamento de filas com o SQS da Amazon é a prática padrão.
Complementando a jornada, temos a subscription com SNS e o consumer do SQS,
implementando o padrão de Decorator Partner pooling para receber as mensagens do
SQS.

1. **Tecnologias Utilizadas:**

   - **LocalStack:** Simula serviços da AWS localmente, permitindo o
     desenvolvimento e teste sem a necessidade de recursos na nuvem.
   - **SNS (Simple Notification Service) e SQS (Simple Queue Service):**
     Serviços da AWS para mensagens e filas, respectivamente.
   - **Fastify.js:** Um framework web para Node.js conhecido por sua eficiência
     e desempenho.
   - **Clean Code:** Práticas de programação que visam criar código legível,
     modular e fácil de entender.
   - **Decorator:** Utilizado para injeção de dependências e criação de rotas,
     tornando o código mais organizado.
   - **Zod** Utilizado para validação e transformação dos DTOs.

2. **Funcionalidades Principais:**

   - **Docker/LocalStack:** Utiliza contêineres Docker para implantação e
     LocalStack para simulação de serviços AWS localmente.
   - **Gerenciamento de Filas e Tópicos SNS:** Permite a criação, configuração e
     gerenciamento eficiente de filas e tópicos SNS.
   - **Pooling de Mensagens:** Implementa um mecanismo de pooling de mensagens
     para envio e recebimento eficiente.
   - **Visualização de Métodos em Funcionamento:** Utiliza o plugin REST Client
     para testar os métodos, proporcionando uma maneira fácil de visualizar o
     funcionamento das rotas.

3. **Estrutura do Projeto:**

   - **Pasta `src/application`:** Contém código específico da aplicação, como
     controllers, decorators, exceptions, middlewares, services e utilidades que
     não são contaminados por bibliotecas externas ou pela camada de infra.
   - **Pasta `src/infra`:** Contém código específico da infraestrutura, como
     adapters, controllers, decorators, services, etc. Esta camada é responsável
     por se comunicar com a camada de aplicação e com bibliotecas externas.

4. **Início do Projeto:**

   - Clonagem do projeto e acesso à pasta.
   - Inicialização do LocalStack com Docker Compose.
   - Utilização do AWS CLI para criar um bucket no S3 usando o LocalStack.

5. **Injeção de Dependências:**

   - Utilização do decorator para injeção de dependências no controller.
   - Exemplo de injeção de serviço SQS.

6. **Service de Pooling:**

   - Injeção do service de pooling no arquivo principal do aplicativo.
   - Explicação do funcionamento do service de pooling que recebe e exclui
     mensagens da fila SQS.

7. **Testando as Rotas:**

   - Descrição passo a passo para testar as rotas usando o plugin REST Client.

8. **Links Utilizados para Estudo:**
   - Lista de links utilizados para estudar e desenvolver o projeto.

# Iniciando o projeto

### Clone o projeto e acessa a pasta

```bash
git clone git@github.com:joisiney/sqs-sns-localstak-decorator-clean-code-nodejs.git
```

# Iniciar Localstack com Docker Compose

O arquivo `docker-compose.yml` contém a configuração necessária para iniciar o
Localstack com os serviços SNS e SQS. Para inicializar o Localstack, execute o
comando abaixo:

```bash
docker-compose up -d
```

# Usando Localstack

Seguindo nosso tutorial, agora com o Localstack em execução, vamos realizar o
primeiro teste, criando um Bucket no S3 usando o AWS CLI. Se você ainda não tem
ele instalado, pode baixar aqui o [AWS CLI](https://aws.amazon.com/pt/cli/).

Vamos lá, digite no seu terminal o seguinte comando:

```bash
# Criar um bucket
aws --endpoint-url=http://localhost:4566 s3 mb s3://test

# Listar todos os buckets
aws --endpoint-url=http://localhost:4566 s3 ls
```

O resultado será um bucket criado e depois a listagem de buckets.

# Erro no Localstack

- No meu caso tive problemas para utiliza-lo em meu MAC M1, dai tive que
  atualizar o localstack para a versão mais recente, a vesão antiga não
  funciona.

```bash
docker pull localstack/localstack:latest
```

- Preencha as informações solicitadas:
- AWS Access Key ID: S3RVER
- AWS Secret Access Key: S3RVER
- Default region name: us-east-1
- Default output format: json

# Salvando credenciais do localstack

```bash
aws configure --profile localstack
```

# Local onde as credenciais são salvas

```bash
ls ~/.aws
```

# Inicializando o projeto

- Chega de enrolação, bora rodar o projeto. Se tudo der certo basta rodar o
  comando abaixo:

```bash
docker-compose up -d
yarn start:dev
```

que deve aparecer o seguinte log:

```bash
┌─────────┬──────────────────────────────────────────┬────────────────────────────────────────────────────────────┐
│ (index) │                   url                    │                          handler                           │
├─────────┼──────────────────────────────────────────┼────────────────────────────────────────────────────────────┤
│    0    │           '[POST] /sns/topic'            │               'SNSController::createTopic()'               │
│    1    │           '[GET] /sns/topics'            │               'SNSController::listTopics()'                │
│    2    │            '[GET] /sns/topic'            │                'SNSController::getTopics()'                │
│    3    │          '[DELETE] /sns/topic'           │               'SNSController::deleteTopic()'               │
│    4    │           '[POST] /sqs/queue'            │               'SQSController::createQueue()'               │
│    5    │      '[POST] /sqs/dispatch-message'      │             'SQSController::dispatchMessage()'             │
│    6    │           '[GET] /sqs/queues'            │               'SQSController::listQueues()'                │
│    7    │            '[GET] /sqs/queue'            │                'SQSController::getQueues()'                │
│    8    │      '[GET] /sqs/receive-messages'       │             'SQSController::receiveMessages()'             │
│    9    │ '[GET] /sqs/receive-messages-and-delete' │        'SQSController::receiveAndDeleteMessages()'         │
│   10    │          '[DELETE] /sqs/queue'           │               'SQSController::deleteQueue()'               │
│   11    │     '[POST] /sns/topic/subscription'     │     'SubscriptionController::createSubscriptonTopic()'     │
│   12    │     '[GET] /sns/topic/subscriptions'     │     'SubscriptionController::listSubscriptionTopics()'     │
│   13    │     '[GET] /sns/topic/subscription'      │ 'SubscriptionController::getSubscriptionByTopicAndQueue()' │
└─────────┴──────────────────────────────────────────┴────────────────────────────────────────────────────────────┘
Server listening at http://[::1]:3001 🚀🚀
```

Perceba que os logs já indicam que o servidor está rodando e as rotas que estão
disponíveis para teste.

# Testando as rotas

- Execute o método `[POST] /sqs/queue` para criar uma fila SQS.
- Execute o método `[POST] /sns/topic` para criar um tópico SNS.
- Execute o método `[POST] /sqs/dispatch-message` para enviar uma mensagem para
  a fila SQS, neste ponto, a mensagem será enviada para a fila SQS e, em
  seguida, será recebida pelo service de pooling e excluída da fila.

# Como que funciona as rotas.

- A aplicação é inicializada através do service `src/application/server.ts`,
  onde é feita a injeção de dependências e inicialização do servidor Fastify.
  Perceba que neste arquivo estamos injetando as rotas do SNS e SQS,
  inicializando o servidor e injetando as rotas. Alem disso, estamos injetando o
  serviço de pooling para receber as mensagens da fila SQS.

Veja o quando é simples criar um controller, basta criar um arquivo na pasta
controller e injetar o serviço que deseja utilizar. Veja o exemplo abaixo:

```typescript
import { AbstractController } from '@/application/controller/abstract.controller';
import { IQueueService } from '@/application/service/queue.service';
import { IQueueDto, QueueDto } from '@/infra/controller/sqs/dto/queue-name.dto';

import { Controller, Inject, Route } from '@/infra/decorator';

@Controller('/sqs')
export class SQSController extends AbstractController {
  @Inject('SQS_SERVICE')
  public readonly sqsService: IQueueService.Implements;

  @Route({ method: 'POST', url: '/queue', dto: QueueDto })
  async createQueue(response: IQueueDto): Promise<{ status: boolean }> {
    const status = await this.sqsService.createQueue(response);
    return { status };
  }
}
```

Observe que a rota criada `/sqs/queue` recebe um dto `QueueDto` que é
responsável por validar os dados recebidos na requisição. Veja o exemplo abaixo:

```typescript
import { z } from 'zod';

export const QueueDto = z.object({
  queue: z
    .string({
      required_error: 'Nome da fila é obrigatório',
    })
    .min(3, {
      message: 'Nome da fila deve ter no mínimo 3 caracteres',
    }),
});

export type IQueueDto = z.infer<typeof QueueDto>;
```

- Este `DTO` recebe um padrão de dados com bastante informação para que o `zod`
  valide e transforme os dados de acordo com as necessidades do `Controller`.
  Veja o exemplo abaixo:

```
{
  queue: 'local-queue',
  ...params,
  ...query,
  ...body,
  headers: {
    ...headers
  },
  userAgent: {
    family: 'Other',
    version: '0.0.0',
    ip: '127.0.0.1',
    ipRaw: '',
    ips: undefined,
    ipRemote: '127.0.0.1',
    browser: 'Other 0.0.0',
    os: 'Other 0.0.0',
    devide: 'Other 0.0.0'
  }
}
```

# Tratamento de erros no decorator de rota:

- Por padrão é tratado e retornado um response com bastante detalhe sobre o erro
  que ocorreu. Veja o exemplo abaixo:

```json
{
  "code": 400,
  "status": "BadRequestException",
  "message": "Queue already exists",
  "method": "POST",
  "url": "/sqs/queue",
  "stack": {
    "controller": "SQSController",
    "className": "SQSService",
    "pathFile": "infra/service/aws/sqs.service.ts",
    "startLine": 100,
    "endLine": 13
  }
}
```

# Como que funciona a injeção de dependências

- A injeção de dependências é feita através do decorator que recebe um serviço e
  injeta ele no controller e cria sua respectiva rota. Veja o exemplo abaixo:

```typescript
import { awsCredentials } from '@/application/config/aws.config';
import { SQSController } from '@/infra/controller/sqs/index.controller';

import { TypeInjection, registerDependency } from '@/infra/decorator';
import { SQSService } from '@/infra/service/aws/sqs.service';
import { logsRoutes } from '@/infra/util/logs.routes';
import { SQSClient } from '@aws-sdk/client-sqs';
import Fastify, { FastifyInstance } from 'fastify';
import 'reflect-metadata';

const app: FastifyInstance = Fastify({ logger: false });

app.setErrorHandler(function (error, request, reply) {
  return reply.send(error);
});

const sqsClient = new SQSClient(awsCredentials);

registerDependency({
  services: [
    {
      key: 'SQS_SERVICE',
      type: TypeInjection.SINGLETON,
      handle: () => new SQSService(sqsClient),
    },
  ],
  controllers: [SQSController],
  app,
});

app.listen(
  {
    port: 3001,
  },
  (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    logsRoutes(`Server listening at ${address} 🚀🚀`);
  },
);
```

# Como que funciona o service de pooling

- O service de pooling é injetado no arquivo `src/application/server.ts` e é
  responsável por receber as mensagens da fila SQS e excluí-las da fila. Veja o
  exemplo abaixo:

```typescript
import { IQueueService } from '@/application/service/queue.service';

import { Inject, QueueConsumer } from '@/infra/decorator';
import { IQueueConsumer } from '@/infra/decorator/queue-consumer/index.dto';

export class QueueConsumerService {
  @Inject('SQS_SERVICE')
  public readonly sqsService: IQueueService.Implements;

  private async receiveMessages({
    queue,
  }: Pick<IQueueConsumer.InternalProps, 'queue'>): Promise<
    IQueueService.Message[]
  > {
    return this.sqsService.receiveMessages({
      queue,
      awaitTimeSeconds: 2,
      take: 10,
      visibilityTimeoutSeconds: 2,
      messageAttributesNames: ['name', 'age', 'isActived'],
    });
  }
  private async consumerMessages({ messages }: IQueueConsumer.InternalProps) {
    console.log(messages);
    new Promise((resolve) => {
      setTimeout(() => {
        resolve('done');
      }, 2000);
    });
  }
  private async deleteMessages({
    queue,
    messages,
  }: IQueueConsumer.InternalProps): Promise<void> {
    await this.sqsService.deleteMessages({
      queue,
      messages,
    });
  }

  @QueueConsumer({ key: 'local-queue', queue: 'local-queue', polling: 1000 })
  async createQueue(): Promise<IQueueConsumer.Pipeline> {
    return {
      receiveMessages: this.receiveMessages.bind(this),
      consumerMessages: this.consumerMessages.bind(this),
      deleteMessages: this.deleteMessages.bind(this),
    };
  }
}
```

- Perceba que o poling é feito a cada 1000 milissegundos, ou seja, a cada 1
  segundo ele verifica se tem mensagens na fila e as exclui. Caso ocorra algum
  erro ele tenta novamente exponenciando o tempo de espera até chegar a 5
  minutos de espera e depois cancela o processo. Neste caso de uso você deve
  tratar os dados de acordo com a sua necessidade através do método
  `consumerMessages` que é responsável por tratar as mensagens recebidas.

# Links utilizados para estudo

| Link                                                                                             | Descrição                                                                                  |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| [Localstack](https://github.com/localstack/localstack)                                           | Simula serviços da AWS localmente                                                          |
| [Fastify](https://www.fastify.io/)                                                               | Framework web para Node.js                                                                 |
| [Clean Code](https://www.amazon.com.br/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882) | Livro Clean Code                                                                           |
| [Decorator](https://www.typescriptlang.org/docs/handbook/decorators.html)                        | Decorators em TypeScript                                                                   |
| [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html)                | AWS CLI                                                                                    |
| [AWS GIT](https://github.com/awsdocs/aws-doc-sdk-examples/tree/main/javascriptv3/example_code)   | Exemplos de código AWS                                                                     |
| [danieldcs](https://danieldcs.com/simulando-aws-local-com-localstack-e-node-js)                  | Simulando AWS local com Localstack                                                         |
| [pulse](https://encurtador.com.br/qtLUZ)                                                         | Desenvolvimento de aplicações serverless locais: uma visão                                 |
| [Vídeo aula SQS](https://www.youtube.com/watch?v=b0_NFzdPkDo)                                    | Vídeo aula SQS                                                                             |
| [Secret Manager](https://www.youtube.com/watch?v=NiKSdX_eitU&t=1609s)                            | Localstack Secrets Manager Nodejs                                                          |
| [Comandos AWS Cli](./docs/commands-aws-cli.md)                                                   | Alguns comandos que utilizei para testar a aplicação durante o processo de desenvolvimento |
