export const stackErrorParse = (stack: string) => {
  const regex = /at (\w+)\.(\w+) \(([^:]+):(\d+):(\d+)\)/g;
  const matches = stack.matchAll(regex);
  const [, className, , rawFile, start, end] = matches.next().value;
  return {
    className,
    pathFile: rawFile.split('/src/').pop(),
    startLine: Number(start),
    endLine: Number(end),
  };
};
