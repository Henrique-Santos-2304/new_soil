import { CreateUserDto } from '@root/domain/dto';
import { UserModel } from '@root/domain/models';

interface ICreateUserRepo {
  create(user: ICreateUserRepo.Params): ICreateUserRepo.Response;
}

namespace ICreateUserRepo {
  export type Params = CreateUserDto;
  export type Response = Promise<UserModel | undefined | "QUERY_ERROR">;
}

export { ICreateUserRepo };
