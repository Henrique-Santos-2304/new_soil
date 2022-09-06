import { Inject, Injectable } from '@nestjs/common';
import {
  ICreateUserRepo,
  ICreateUserService,
  IEncrypterData,
  IFindUserRepo,
} from '@root/domain';

@Injectable()
export class CreateUserService implements ICreateUserService {

  constructor(
    @Inject('IFindUserRepo') private readonly findUserRepo: IFindUserRepo,
    @Inject('ICreateUserRepo') private readonly createUserRepo: ICreateUserRepo,
    @Inject('IEncrypterData') private readonly encrypter: IEncrypterData
  ) {}

  async start({
    login,
    password,
    userType,
  }: ICreateUserService.Params): ICreateUserService.Response {
    const user = await this.findUserRepo.by_login({ login });

    if (user) throw new Error('User already exists');

    const passwordEncrypted = await this.encrypter.encrypt({value: password})

    const createdUser = await this.createUserRepo.create(
      {login, userType, password: passwordEncrypted}
      )

    if(!createdUser) throw new Error("User Not Created")

    return {status: "Sucess"};
  }
}
