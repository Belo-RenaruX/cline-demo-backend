import dayjs from "dayjs";
import { UserDTO } from "../dtos/user/user.dto";
import { BaseModel } from "./base.model";
import { ErrorModel } from "./error.model";

export class UserModel extends BaseModel {
  readonly id?: number;
  readonly username?: string;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly password?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;

  constructor(user?: UserDTO) {
    super();

    this.id = user?.id;
    this.username = user?.username;
    this.firstName = user?.firstName;
    this.lastName = user?.lastName;
    this.password = user?.password;
    this.createdAt = user?.createdAt ? dayjs(user.createdAt).toISOString() : undefined;
    this.updatedAt = user?.updatedAt ? dayjs(user.updatedAt).toISOString() : undefined;
  }

  get fullName(): string | undefined {
    return this.firstName && this.lastName 
      ? `${this.firstName} ${this.lastName}`
      : undefined;
  }
  
  isValidUser(): this {
    if(!this.id) {
      ErrorModel.notFound({ message: 'User not found' });
    }

    return this;
  }

  hasValidPassword(password: string): this {
    if(this.password !== password) {
      ErrorModel.notFound({ message: 'Incorrect password' });
    }

    return this;
  }
}
