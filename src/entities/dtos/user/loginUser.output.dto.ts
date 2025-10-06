import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

export const LoginUserOutputDTOSchema = z.object({
  id: z.number().int().positive().openapi({
    description: 'Unique ID of the user',
    example: 1,
  }),
  fullName: z.string().openapi({
    description: 'Full name of the user',
    example: 'Renato Berrocal',
  }),
  createdAt: z.string().openapi({
    description: 'Creation date of the user in DD-MM-YYYY HH:mm:ss',
    example: '01-01-2025 00:00:00',
  }),
});

export type LoginUserOutputDTO = z.infer<typeof LoginUserOutputDTOSchema>;
