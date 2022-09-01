import { CreateUserDto } from '@root/domain/dto/users/create.dto';
import { UserModel } from '@root/domain/models';

interface ICreateUserService {
  start(user: ICreateUserService.Params): ICreateUserService.Response;
}

namespace ICreateUserService {
  export type Params = CreateUserDto;
  export type Response = Promise<UserModel>;
}

export { ICreateUserService };
