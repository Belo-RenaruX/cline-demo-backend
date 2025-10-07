import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

import { StatusCode, StatusMessage } from 'src/entities/enums/status.enum';
extendZodWithOpenApi(z);

export const UnprocessableEntityResponseDTOSchema = z
  .object({
    success: z.literal(false).openapi({
      description: 'Indicates the request failed.',
      example: false,
    }),
    statusCode: z.literal(StatusCode.UNPROCESSABLE_ENTITY).openapi({
      description: 'HTTP status code for the error.',
      example: StatusCode.UNPROCESSABLE_ENTITY,
    }),
    statusMessage: z.literal(StatusMessage.UNPROCESSABLE_ENTITY).openapi({
      description: 'Textual description of the status.',
      example: StatusMessage.UNPROCESSABLE_ENTITY,
    }),
    message: z.string().openapi({
      description: 'Raw internal error message intended for the developer.',
      example: 'Generic error',
    }),
  })
  .strict();

export type UnprocessableEntityResponseDTO = z.infer<typeof UnprocessableEntityResponseDTOSchema>;
