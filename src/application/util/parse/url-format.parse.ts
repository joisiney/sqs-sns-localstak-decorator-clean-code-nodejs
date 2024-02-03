export const urlFormatParser = (rawUrl: string, path?: string): string => {
  return (
    '/' +
    (path ?? '').split('/').concat(rawUrl.split('/')).filter(Boolean).join('/')
  );
};
