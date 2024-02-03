# Node.js + LocalStack + SNS + SQS + Fastify.js + CleanCode + Decorator + Dependency Inversion

**Serviços de Gerenciamento e consumo de Filas e Tópicos SNS em Ambiente
Docker/LocalStack com Fastify, Clean Code e Injeção de Dependências utilizando
decorators**

Esta é uma POCK contendo padrões de serviços e decorators para gerenciamento e
consumo de filas em SQS/SNS. Para rodar o projeto em desenvolvimento utilizei o
Docker e LocalStack. Para gerenciar rotas utilizei Fastify.js. Adotamos práticas
de Clean Code, decorators e injeção de dependências para garantir um código
claro, modular e facilmente mantido.

**Principais Características:**

1. **Docker/LocalStack:**

   - Utilizamos contêineres Docker para facilitar a implantação e garantir a
     consistência do ambiente de desenvolvimento e produção. O LocalStack é
     empregado para simular serviços da AWS localmente, permitindo testes e
     desenvolvimento sem a necessidade de recursos da nuvem.

2. **Fastify:**

   - O aplicativo é construído sobre o framework Fastify, conhecido por sua
     eficiência e desempenho em aplicações web e API. A escolha do Fastify
     contribui para uma execução rápida e eficiente, ideal para serviços de
     mensageria.

3. **Clean Code e Injeção de Dependências:**

   - Adotamos práticas de Clean Code para garantir uma base de código legível,
     modular e fácil de entender. A injeção de dependências orquestrar a
     reutilização dos controlers/services e inicializar as rotas com um padrão
     mais amigável de rodas.

4. **Gerenciamento de Filas e Tópicos SNS:**

   - Nosso aplicativo permite a criação, configuração e gerenciamento eficiente
     de filas e tópicos SNS. Os recursos oferecidos pelo SNS, como pub/sub
     (publicação/assinatura), são plenamente suportados para garantir uma
     comunicação eficaz entre os diversos componentes do sistema.

5. **Pooling de Mensagens:**

   - Implementamos um mecanismo de pooling de mensagens para enviar e receber
     mensagens de filas e tópicos de maneira eficiente. Embora o exemplo inicial
     integre a parte de pooling no mesmo projeto, destacamos que é facilmente
     escalável e separável em um ambiente distinto, conforme a necessidade do
     cliente.

6. **Visualizar médotos em funcionamento:**

- Utilizamos o plugin REST Client para visualizar os métodos em funcionamento.
  Para que você possa testar os métodos, basta instalar-lo
  [através do link](https://open.vscode.dev/Huachao/vscode-restclient) após
  instalado basta abrir o arquivo da arvore de pastas representadas abaixo e
  clicar em `Send Request` para testar os métodos.

```dir
rest-client-http
 - sns-subscription.http
 - sns-topic.http
 - sqs-queue.http
```

7. **Pasta src/application:**
   - Contém todo e qualquer código que seja específico da aplicação, como
     controllers, decorators, exceptions, middlewares, services ou util.
     Qualquer serviço contido nesta pasta não deve depender de nenhum serviço de
     infraestrutura ou de terceiros.

```dir
- src
  - application
    - controller
    - decorator
    - exception
    - middleware
    - service
    - util
```

7. **Pasta src/infra:**

- Contém todo e qualquer código que seja específico da infraestrutura, como
  adapter, controller, decorator, service, repository, dto, etc. Todo e qualquer
  padrão utilizado nesta pasta geralmente é contaminado por serviços de
  terceiros ou implementa interface da pasta application.

```dir
- src
  - infra
    - controller
    - decorator
    - service
    - util
```

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
