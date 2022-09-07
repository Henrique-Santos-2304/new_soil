import { CreateUserDto } from '@root/domain/dto';
import { ICreateUserService } from '@root/domain/usecases';

interface ICreateUserController {
  createUser(
    user: ICreateUserController.Params,
  ): ICreateUserController.Response;
}

namespace ICreateUserController {
  export type Params = CreateUserDto;
  export type Response = Promise<{ status: string; error?: string }>;
}

export { ICreateUserController };
