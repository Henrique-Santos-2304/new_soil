import { CreateUserDto } from '@root/domain/dto';
import { UserModel } from '@root/domain/models';

interface IFindUserRepo {
  by_login({ login }: IFindUserByLogin.Params): IFindUserByLogin.Response;
  by_id({ user_id }: IFindUserById.Params): IFindUserById.Response;
}

namespace IFindUserByLogin {
  export type Params = { login: CreateUserDto['login'] };
  export type Response = Promise<UserModel | undefined | 'QUERY_ERROR'>;
}

namespace IFindUserById {
  export type Params = { user_id: UserModel['user_id'] };
  export type Response = Promise<UserModel | undefined | 'QUERY_ERROR'>;
}

export { IFindUserRepo, IFindUserByLogin, IFindUserById };
