import { z, ZodObject, ZodRawShape, ZodDiscriminatedUnion } from 'zod';

import { BadRequestResponseDTOSchema } from 'src/entities/dtos/response/badRequest.response.dto';
import { InternalServerErrorResponseDTOSchema } from 'src/entities/dtos/response/internalServerError.response.dto';
import { NotFoundResponseDTOSchema } from 'src/entities/dtos/response/notFound.response.dto';
import { OkResponseDTOSchema } from 'src/entities/dtos/response/ok.response.dto';

import { IResponseStrategy } from '../response.manager';

export class DataResponseStrategy implements IResponseStrategy {
  constructor(private readonly dataSchema: ZodObject<ZodRawShape>) {}

  getSchema(): ZodDiscriminatedUnion {
    return z.discriminatedUnion('statusCode', [
      OkResponseDTOSchema.extend({ data: this.dataSchema.strip() }).strip(),
      BadRequestResponseDTOSchema,
      NotFoundResponseDTOSchema,
      InternalServerErrorResponseDTOSchema,
    ]);
  }
}
