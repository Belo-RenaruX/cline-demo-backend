import { OkResponseDTOSchema } from "src/entities/dtos/response/ok.response.dto";
import { LoginUserBodyDTOSchema } from "src/entities/dtos/user/loginUser.input.dto";
import { LoginUserOutputDTOSchema } from "src/entities/dtos/user/loginUser.output.dto";
import { HttpSpecMethod } from "src/entities/enums/methods.enum";
import { StatusCode } from "src/entities/enums/status.enum";
import { IOpenApiManager } from "src/managers/openapi/openapi.manager";

export class LoginUserV1Docs {
  private readonly version: string = '/v1';

  constructor(private readonly manager: IOpenApiManager) {}

  registerDocs(): void {
    this.manager.registerRoute({
      method: HttpSpecMethod.POST,
      path: `${this.version}/users/login`,
      description: 'Login a user',
      tags: ['users'],
      body: LoginUserBodyDTOSchema,
      responses: {
        [StatusCode.OK]: OkResponseDTOSchema.extend({
          data: LoginUserOutputDTOSchema,
        }),
      },
      secure: true,
    });
  }
}
