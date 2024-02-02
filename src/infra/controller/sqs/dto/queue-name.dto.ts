import { z } from 'zod';

export const QueueDto = z.object({
  queue: z
    .string({
      required_error: 'Nome da fila é obrigatório',
    })
    .min(3, {
      message: 'Nome da fila deve ter no mínimo 3 caracteres',
    }),
});

export type IQueueDto = z.infer<typeof QueueDto>;
