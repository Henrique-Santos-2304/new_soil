import { Inject, Injectable } from '@nestjs/common';
import {
  ICreateUserRepo,
  ICreateUserService,
  IEncrypterData,
  IFindUserByLogin,
  IFindUserRepo,
  NEncrypt,
} from '@root/domain';

@Injectable()
export class CreateUserService implements ICreateUserService {
  private passwordHash: string;

  constructor(
    @Inject('IFindUserRepo') private readonly findUserRepo: IFindUserRepo,
    @Inject('ICreateUserRepo') private readonly createUserRepo: ICreateUserRepo,
    @Inject('IEncrypterData') private readonly encrypter: IEncrypterData,
  ) {}

  async checkUserExists({ login }: IFindUserByLogin.Params): Promise<void> {
    const user = await this.findUserRepo.by_login({ login });

    if (user) throw new Error('User already exists');
  }

  async encryptPassword({ value }: NEncrypt.Params): Promise<void> {
    this.passwordHash = await this.encrypter.encrypt({ value });
  }

  async createANewUser(
    user: Omit<ICreateUserService.Params, 'internal_password'>,
  ): Promise<void> {
    const createdUser = await this.createUserRepo.create(user);

    if (!createdUser) throw new Error('User Not Created');
  }

  checkPasswordInternalIsValid(password: string): void {
    const internalPassword = process.env.INTERNAL_PASSWORD;
    if (password !== internalPassword) throw new Error('Invalid Credentials');
  }

  async start({
    login,
    password,
    userType,
    internal_password,
  }: ICreateUserService.Params): ICreateUserService.Response {
    this.checkPasswordInternalIsValid(internal_password);
    await this.checkUserExists({ login });
    await this.encryptPassword({ value: password });
    await this.createANewUser({ login, userType, password: this.passwordHash });

    return { status: 'Sucess' };
  }
}
