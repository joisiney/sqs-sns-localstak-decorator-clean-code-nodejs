import { urlFormatParser } from '@/application/util/parse/url-format.parse';
import { controllerPath, routes } from '@/infra/decorator';

export const logsRoutes = (title: string) => {
  const logs: any[] = [];
  Object.values(routes).forEach((classRoutes: any) => {
    Object.values(classRoutes).forEach((methodRoutes: any) => {
      Object.values(methodRoutes).forEach((route: any) => {
        logs.push({
          url: `[${route.method}] ${urlFormatParser(
            route.url,
            controllerPath[route.className],
          )}`,
          handler: `${route.className}::${route.propertyKey}()`,
        });
      });
    });
  });
  console.table(logs);
  console.log(title);
};
