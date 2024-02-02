import { z } from 'zod';

export const DispatchMessageDto = z.object({
  queue: z
    .string({
      required_error: 'Nome da fila é obrigatório',
    })
    .min(3, {
      message: 'Nome da fila deve ter no mínimo 3 caracteres',
    }),
  message: z.string({
    required_error: 'Mensagem é obrigatória',
  }),
  messageAttributes: z.object({
    name: z.string({
      required_error: 'Nome é obrigatório',
    }),
    age: z.number({
      required_error: 'Idade é obrigatória',
    }),
    isActived: z.boolean({
      required_error: 'Status é obrigatório',
    }),
  }),
});

export type IDispatchMessageDto = z.infer<typeof DispatchMessageDto>;
