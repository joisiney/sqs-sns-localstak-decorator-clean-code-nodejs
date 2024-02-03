import * as Exceptions from '@/application/exception';
const classesToCheck = Object.values(Exceptions);
export const isMyException = (error: unknown) => {
  const [treatedError] = classesToCheck
    .map((myClasse) => {
      if (error instanceof myClasse) {
        return myClasse;
      }
      return null;
    })
    .filter(Boolean) as any as Exceptions.HttpException[];
  return {
    is: Boolean(treatedError),
    name: treatedError && treatedError.name,
    error: error as Exceptions.HttpException,
  };
};
