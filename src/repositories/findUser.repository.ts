import { MysqlClient } from 'src/clients/mysql/mysql.client';
import { UserDM } from 'src/entities/dms/user.dm';
import { UserDTO } from 'src/entities/dtos/user/user.dto';

export interface IFindUserRepository {
  execute(username: UserDM['username']): Promise<UserDTO | undefined>;
}

export class FindUserRepository implements IFindUserRepository {
  async execute(username: UserDM['username']): Promise<UserDTO | undefined> {
    const db = MysqlClient.instance.getDb();
    const result = await db
      .selectFrom('Users')
      .select(['id', 'firstName', 'lastName', 'password', 'createdAt'])
      .where('username', '=', username)
      .executeTakeFirst();
    return result as UserDTO | undefined;
  }
}

export class FindUserRepositoryMock implements IFindUserRepository {
  async execute(): Promise<UserDTO | undefined> {
    return {
      id: 1,
      firstName: 'Renato',
      lastName: 'Berrocal',
      password: 'test123,'
    };
  }
}
