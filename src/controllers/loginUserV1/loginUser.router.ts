import { FastifyInstance } from 'fastify';
import { ILoginUserController, LoginUserControllerBuilder } from './loginUser.controller';
import { HttpMethod } from 'src/entities/enums/methods.enum';

export class LoginUserV1Router {
  private readonly version: string = '/v1';
  private readonly loginUserController: ILoginUserController;

  constructor(private readonly fastify: FastifyInstance) {
    this.loginUserController = LoginUserControllerBuilder.build();
  }

  registerRouter(): void {
    this.fastify.route({
      method: HttpMethod.POST,
      url: `${this.version}/users/login`,
      handler: this.loginUserController.handle.bind(this.loginUserController),
    });
  }
}
