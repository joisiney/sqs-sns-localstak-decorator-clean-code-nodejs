import { routes } from '@/infra/decorator';

export class AbstractController {
  private path: string;

  protected urlFormat(rawUrl: string): string {
    return (
      '/' +
      (this.path ?? '')
        .split('/')
        .concat(rawUrl.split('/'))
        .filter(Boolean)
        .join('/')
    );
  }
  constructor(protected readonly fastify: { route: Function }) {
    const controller = this.constructor.name;
    const classRoutes = routes[controller];
    Object.keys(classRoutes).forEach((method) => {
      const methodRoutes = classRoutes[method];
      Object.keys(methodRoutes).forEach((key) => {
        const { method, handle, url: rawUrl } = methodRoutes[key];
        const url = this.urlFormat(rawUrl);
        this.fastify.route({
          method,
          url,
          handler: handle.bind(this),
        });
      });
    });
  }
}
