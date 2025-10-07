import { ZodDiscriminatedUnion, ZodObject, ZodRawShape } from 'zod';

import { BaseModel } from 'src/entities/models/base.model';
import { ErrorModel } from 'src/entities/models/error.model';
import { ResponseModel } from 'src/entities/models/response.model';

import { DataResponseStrategy } from './strategies/dataResponse.strategy';

export interface IResponseStrategy {
  getSchema(): ZodDiscriminatedUnion;
}

export interface IResponseManager {
  validateResponse(model?: BaseModel | ErrorModel): ResponseModel;
}

export class ResponseManager implements IResponseManager {
  constructor(private readonly strategy: IResponseStrategy) {}

  validateResponse(model?: BaseModel | ErrorModel): ResponseModel {
    try {
      const schema = this.strategy.getSchema();
      const response = new ResponseModel(model, schema);
      return response;
    } catch (error) {
      const parsingError = ErrorModel.fromError(error);
      return new ResponseModel(parsingError);
    }
  }
}

export class ResponseManagerBuilder {
  static buildData(dataSchema: ZodObject<ZodRawShape>): ResponseManager {
    return new ResponseManager(new DataResponseStrategy(dataSchema));
  }
}
