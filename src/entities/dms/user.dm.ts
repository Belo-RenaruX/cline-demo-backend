import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';
extendZodWithOpenApi(z);

export const UserDMSchema = z.object({
  id: z.number().int().positive().openapi({
    description: 'Unique ID of the user',
    example: 1,
  }),
  username: z.string().openapi({
    description: 'Username of the user',
    example: 'renarux',
  }),
  firstName: z.string().openapi({
    description: 'First name of the user',
    example: 'Renato',
  }),
  lastName: z.string().openapi({
    description: 'Last name of the user',
    example: 'Berrocal',
  }),
  password: z.string().openapi({
    description: 'Password of the user',
    example: 'test123',
  }),
  createdAt: z.string().openapi({
    description: 'Creation date of the user in DD-MM-YYYY HH:mm:ss',
    example: '01-01-2025 00:00:00',
  }),
  updatedAt: z.string().openapi({
    description: 'Last update of the user in DD-MM-YYYY HH:mm:ss',
    example: '01-01-2025 00:00:00',
  }),
});

export type UserDM = z.infer<typeof UserDMSchema>;
