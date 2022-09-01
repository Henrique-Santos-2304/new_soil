import { Inject, Injectable } from '@nestjs/common';
import {
  ICreateUserRepo,
  ICreateUserService,
  IFindUserRepo,
} from '@root/domain';

@Injectable()
export class CreateUserService implements ICreateUserService {
  constructor(
    @Inject('IFindUserRepo') private readonly findUserRepo: IFindUserRepo,
    @Inject('ICreateUserRepo') private readonly createUserRepo: ICreateUserRepo,
  ) {}

  async start({
    login,
    password,
    userType,
  }: ICreateUserService.Params): ICreateUserService.Response {
    const user = this.findUserRepo.by_login({ login });

    if (user) throw new Error('User already exists');
    return { login, password, userType, user_id: '' };
  }
}
