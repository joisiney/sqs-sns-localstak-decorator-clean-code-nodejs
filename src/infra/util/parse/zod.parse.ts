import { ZodException } from '@/application/exceptions';
import { z } from 'zod';

export const zodParse = (
  data: any,
  dto?: z.ZodObject<any> | z.ZodEffects<any, any>,
) => {
  if (!dto) return {};
  try {
    return dto.parse(data);
  } catch (error) {
    throw new ZodException(error);
  }
};
