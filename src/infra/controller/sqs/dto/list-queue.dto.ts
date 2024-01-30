import { z } from 'zod';

export const ListQueueDto = z
  .object({
    query: z.object({
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
      queue: data.query.queue,
    };
  });
export type IListQueueDto = z.infer<typeof ListQueueDto>;
