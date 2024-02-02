import { z } from 'zod';

export const TopicAndQueueDto = z.object({
  topic: z
    .string({
      required_error: 'Nome do tópico é obrigatório',
    })
    .min(3, {
      message: 'Nome do tópico deve ter no mínimo 3 caracteres',
    }),
  queue: z
    .string({
      required_error: 'Nome da fila é obrigatório',
    })
    .min(3, {
      message: 'Nome da fila deve ter no mínimo 3 caracteres',
    }),
});

export type ITopicAndQueueDto = z.infer<typeof TopicAndQueueDto>;
