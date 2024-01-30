export function Controller(path: string) {
  return function (constructor: Function) {
    constructor.prototype.path = path.replace(/^\/|\/$/g, '');
  };
}
