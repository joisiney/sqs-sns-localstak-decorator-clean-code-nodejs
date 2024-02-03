const dependencies: any = {};
export const routes: any = {};

export const TypeInjection = {
  SINGLETON: 'SINGLETON',
  TRANSIENT: 'TRANSIENT',
};

type IRegisterDependency = {
  key: string;
  type: string;
  handle: Function;
};

export function registerDependency({
  services,
  controllers,
  app,
}: {
  services: IRegisterDependency | IRegisterDependency[];
  controllers: unknown[];
  app: { route: Function };
}) {
  if (!Array.isArray(services)) services = [services];
  services.forEach((service) => {
    if (service.type === TypeInjection.SINGLETON) {
      const singleton = service.handle();
      dependencies[service.key] = () => singleton;

      return;
    }
    dependencies[service.key] = service.handle;
  });

  controllers.forEach((Controller: any) => new Controller(app));
}

export function Inject(key: string) {
  return function (target: any, propertyKey: string) {
    setTimeout(() => {
      const dependenceToBeInjected = dependencies[key]();
      target[propertyKey] = target.constructor.prototype[propertyKey] =
        dependenceToBeInjected;
    }, 0);
  };
}
