import { z } from 'zod';

export namespace IRoute {
  export type Props = {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    url: string;
    dto?: z.ZodObject<any> | z.ZodEffects<any, any>;
  };
}
