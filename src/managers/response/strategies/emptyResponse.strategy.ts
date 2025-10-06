import { z, ZodDiscriminatedUnion } from 'zod';

import { BadRequestResponseDTOSchema } from 'src/entities/dtos/response/badRequest.response.dto';
import { ConflictResponseDTOSchema } from 'src/entities/dtos/response/conflict.response.dto';
import { ForbiddenResponseDTOSchema } from 'src/entities/dtos/response/forbidden.response.dto';
import { InternalServerErrorResponseDTOSchema } from 'src/entities/dtos/response/internalServerError.response.dto';
import { LockedResponseDTOSchema } from 'src/entities/dtos/response/locked.response.dto';
import { NoContentResponseDTOSchema } from 'src/entities/dtos/response/noContent.response.dto';
import { NotFoundResponseDTOSchema } from 'src/entities/dtos/response/notFound.response.dto';
import { UnauthorizedResponseDTOSchema } from 'src/entities/dtos/response/unauthorized.response.dto';
import { UnprocessableEntityResponseDTOSchema } from 'src/entities/dtos/response/unprocessableEntity.response.dto';

import { IResponseStrategy } from '../response.manager';

export class EmptyResponseStrategy implements IResponseStrategy {
  getSchema(): ZodDiscriminatedUnion {
    return z.discriminatedUnion('statusCode', [
      NoContentResponseDTOSchema,
      BadRequestResponseDTOSchema,
      UnauthorizedResponseDTOSchema,
      ForbiddenResponseDTOSchema,
      NotFoundResponseDTOSchema,
      ConflictResponseDTOSchema,
      UnprocessableEntityResponseDTOSchema,
      LockedResponseDTOSchema,
      InternalServerErrorResponseDTOSchema,
    ]);
  }
}
