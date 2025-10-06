import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

export const LoginUserBodyDTOSchema = z
  .object({
    username: z.string().openapi({
      description: 'Username of the user',
      example: 'renarux',
    }),
    password: z.string().openapi({
      description: 'Password of the user',
      example: 'test123',
    }),
  })
  .strict()
  .openapi({
    description: 'Login User Body',
  });

export type LoginUserBodyDTO = z.infer<typeof LoginUserBodyDTOSchema>;
export interface LoginUserInputDTO {
  Body: LoginUserBodyDTO;
}
