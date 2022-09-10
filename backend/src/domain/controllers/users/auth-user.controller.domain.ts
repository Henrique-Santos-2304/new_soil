import { CreateUserDto } from '@root/domain/models';

interface IAuthUserController {
  authUser(data: IAuthUserController.Params): IAuthUserController.Response;
}

namespace IAuthUserController {
  export type Params = {
    login: CreateUserDto['login'];
    password: CreateUserDto['password'];
  };

  export type Response = Promise<{
    status: string;
    token?: string;
    error?: string;
  }>;
}

export { IAuthUserController };
