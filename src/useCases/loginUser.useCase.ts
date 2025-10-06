import { LoginUserBodyDTO } from "src/entities/dtos/user/loginUser.input.dto";
import { UserModel } from "src/entities/models/user.model";
import { FindUserRepository, IFindUserRepository } from "src/repositories/findUser.repository";

export interface ILoginUserUseCase {
  login(body: LoginUserBodyDTO): Promise<UserModel>;
}

export class LoginUserUseCase implements ILoginUserUseCase {
  constructor(private readonly findUser: IFindUserRepository) {}

  async login(body: LoginUserBodyDTO): Promise<UserModel> {
    const userDTO = await this.findUser.execute(body.username);
    const userModel = new UserModel(userDTO);
    userModel.isValidUser().hasValidPassword(body.password);

    return userModel;
  }
}

export class LoginUserUseCaseBuilder {
  static build(): LoginUserUseCase {
    return new LoginUserUseCase(new FindUserRepository());
  }
}
