import * as Exceptions from '@/application/exceptions';
import { Request, Response } from 'express';

const classesToCheck = Object.values(Exceptions);

export const errorResponse = (err: Error, _: Request, response: Response) => {
  const myError = classesToCheck.find(
    (myClasse) => err instanceof myClasse,
  ) as unknown as Exceptions.HttpException;

  if (myError) {
    return response.status(myError.status).json({
      status: myError.status,
      message: myError.message,
    });
  }

  return response.status(500).json({
    status: 500,
    message:
      'Ooops, infelizmente aconteceu um erro inesperado, por favor tente novamente',
  });
};
