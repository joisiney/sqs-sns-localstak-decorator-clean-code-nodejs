import { z } from 'zod';

export const CreateQueueDto = z
  .object({
    body: z.object({
      queue: z
        .string({
          required_error: 'Nome da fila é obrigatório',
        })
        .min(3, {
          message: 'Nome da fila deve ter no mínimo 3 caracteres',
        }),
    }),
  })
  .transform((data) => {
    return {
      queue: data.body.queue,
    };
  });
export type ICreateQueueDto = z.infer<typeof CreateQueueDto>;
