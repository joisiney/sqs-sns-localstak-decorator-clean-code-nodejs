import { isMyException } from '@/application/util/is/my-exception';
import { stackErrorParse } from '@/application/util/parse/stack-error.parse';
import { userAgentParse } from '@/infra/util/parse/user-agent.parse';
import { zodParse } from '@/infra/util/parse/zod.parse';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
export const routes: any = {};

type IRouteProps = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  url: string;
  dto?: z.ZodObject<any> | z.ZodEffects<any, any>;
};
export function Route({ method, url, dto }: IRouteProps) {
  return function (target: any, propertyKey: string, descriptor: any) {
    const originalMethod = descriptor.value;

    if (!originalMethod) {
      throw new Error(`Method ${propertyKey} is not defined`);
    }

    descriptor.value = async function (
      request: FastifyRequest,
      reply: FastifyReply,
    ): Promise<any> {
      try {
        const userAgent = userAgentParse(request);

        const allProps = {
          params: request.params,
          query: request.query ?? {},
          body: request.body ?? {},
          headers: request.headers,
          userAgent,
        };
        const props = zodParse(allProps, dto);
        const response = await originalMethod.bind(this)(props);
        return reply.send(response);
      } catch (err) {
        const { is, name, error } = isMyException(err);

        const stack: any =
          name === 'ZodException'
            ? {}
            : {
                controller: this.constructor.name,
                ...stackErrorParse(error.stack ?? ''),
              };
        if (is) {
          return reply.status(error.status).send({
            code: error.status,
            status: name,
            message: error.message,
            method,
            url: this.urlFormat(url),
            stack,
          });
        }
        stack.sereverError = error.message;
        return reply.status(500).send({
          code: 500,
          status: 'InternalException',
          message: 'Erro interno no servidor',
          stack,
        });
      }
    };

    routes[target.constructor.name] ??= {};
    routes[target.constructor.name][method] ??= {};
    routes[target.constructor.name][method][url] = {
      handle: descriptor.value,
      method,
      url: url.replace(/^\/|\/$/g, ''),
      className: target.constructor.name,
    };

    return descriptor;
  };
}
