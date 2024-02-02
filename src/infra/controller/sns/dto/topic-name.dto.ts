import { z } from 'zod';

export const TopicDto = z.object({
  topic: z
    .string({
      required_error: 'Nome do tópico é obrigatório',
    })
    .min(3, {
      message: 'Nome do tópico deve ter no mínimo 3 caracteres',
    }),
});

export type ITopicDto = z.infer<typeof TopicDto>;
