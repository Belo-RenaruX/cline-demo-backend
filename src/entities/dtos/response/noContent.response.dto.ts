import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

import { StatusCode, StatusMessage } from 'src/entities/enums/status.enum';
extendZodWithOpenApi(z);

export const NoContentResponseDTOSchema = z
  .object({
    success: z.literal(true).openapi({
      description: 'Indicates the request was successful.',
      example: true,
    }),
    statusCode: z.literal(StatusCode.NO_CONTENT).openapi({
      description: 'HTTP status code for the success response',
      example: StatusCode.NO_CONTENT,
    }),
  })
  .strict();

export type NoContentResponseDTO = z.infer<typeof NoContentResponseDTOSchema>;
