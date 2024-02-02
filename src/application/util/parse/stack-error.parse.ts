export const stackErrorParse = (stack: string) => {
  const regex = /at (\w+)\.(\w+) \(([^:]+):(\d+):(\d+)\)/g;
  const matches = stack.matchAll(regex);
  const { value } = matches.next();

  const [, className, , rawFile, start, end] = value ?? [
    null,
    null,
    null,
    null,
    null,
    null,
  ];
  return {
    className,
    pathFile: rawFile?.split('/src/')?.pop(),
    startLine: Number(start ?? -1),
    endLine: Number(end ?? -1),
  };
};
