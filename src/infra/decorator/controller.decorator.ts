export const controllerPath: { [key: string]: string } = {};
export function Controller(path: string) {
  return function (target: any) {
    controllerPath[target.name] = target.prototype.path = path.replace(
      /^\/|\/$/g,
      '',
    );
  };
}
