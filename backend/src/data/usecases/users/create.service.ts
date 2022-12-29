import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import {
  ICreateUserRepo,
  ICreateUserService,
  IEncrypterData,
  IFindUserByLogin,
  IFindUserRepo,
  NEncrypt,
} from '@root/domain';
import { USER_REPO } from '@root/shared';
import { AlreadyExistsError } from '@root/shared/errors';
import { NotCreatedError } from '@root/shared/errors/not-created';

@Injectable()
export class CreateUserService implements ICreateUserService {
  private passwordHash: string;

  constructor(
    @Inject(USER_REPO.FIND) private readonly findUserRepo: IFindUserRepo,
    @Inject(USER_REPO.CREATE) private readonly createUserRepo: ICreateUserRepo,
    @Inject('IEncrypterData') private readonly encrypter: IEncrypterData,
  ) {}

  async checkUserExists({ login }: IFindUserByLogin.Params): Promise<void> {
    const user = await this.findUserRepo.by_login({ login });

    if (user) throw new AlreadyExistsError('User');
  }

  async encryptPassword({ value }: NEncrypt.Params): Promise<void> {
    this.passwordHash = await this.encrypter.encrypt({ value });
  }

  async createANewUser(
    user: Omit<ICreateUserService.Params, 'internal_password'>,
  ): Promise<{ user_id: string }> {
    const createdUser = await this.createUserRepo.create(user);

    if (!createdUser) throw new NotCreatedError('User');
    return createdUser;
  }

  checkPasswordInternalIsValid(password: string): void {
    const internalPassword = process.env.INTERNAL_PASSWORD;
    if (password !== internalPassword) throw new UnauthorizedException();
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
    const user = await this.createANewUser({
      login,
      userType,
      password: this.passwordHash,
    });

    return { status: 'Sucess', user_id: user.user_id };
  }
}
