import { FastifyReply, FastifyRequest } from "fastify";
import { LoginUserBodyDTOSchema, LoginUserInputDTO } from "src/entities/dtos/user/loginUser.input.dto";
import { LoginUserOutputDTOSchema } from "src/entities/dtos/user/loginUser.output.dto";
import { ErrorModel } from "src/entities/models/error.model";
import { ResponseModel } from "src/entities/models/response.model";
import { IResponseManager, ResponseManagerBuilder } from "src/managers/response/response.manager";
import { ILoginUserUseCase, LoginUserUseCaseBuilder } from "src/useCases/loginUser.useCase";

export interface ILoginUserController {
  handle(input: FastifyRequest, reply: FastifyReply): Promise<void>;
}

export class LoginUserController implements ILoginUserController {
  private response?: ResponseModel;

  constructor(
    private readonly useCase: ILoginUserUseCase,
    private readonly responseManager: IResponseManager,
  ) {}

  async handle(input: FastifyRequest<LoginUserInputDTO>, reply: FastifyReply): Promise<void> {
    try {
      const body = LoginUserBodyDTOSchema.parse(input.body);
      const model = await this.useCase.login(body);
      this.response = this.responseManager.validateResponse(model);
    } catch (error) {
      const errorModel = ErrorModel.fromError(error);
      this.response = this.responseManager.validateResponse(errorModel);
    }

    reply.code(this.response.statusCode).send(this.response.body);
  }
}

export class LoginUserControllerBuilder {
  static build(): LoginUserController {
    return new LoginUserController(
      LoginUserUseCaseBuilder.build(),
      ResponseManagerBuilder.buildData(LoginUserOutputDTOSchema),
    );
  }
}