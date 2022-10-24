import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import {
  IAuthUserService,
  IEncrypterData,
  IFindUserRepo,
  ITokenService,
  UserModel,
} from '@contracts/index';

@Injectable()
class AuthUserService implements IAuthUserService {
  private user: Omit<UserModel, 'login'>;
  private token: string;

  constructor(
    @Inject('IFindUserRepo') private readonly findUserRepo: IFindUserRepo,
    @Inject('IEncrypterData') private readonly encrypter: IEncrypterData,
    @Inject('ITokenService') private readonly tokenService: ITokenService,
  ) {}

  async checkUserAlreadyExists(login: string): Promise<void> {
    const user = await this.findUserRepo.without_login({ login });

    if (!user) throw new UnauthorizedException();

    this.user = user;
  }

  async checkPasswordIsValid(password: string): Promise<void> {
    const passwordIsValid = await this.encrypter.compare({
      old_value: this.user.password,
      valueCompare: password,
    });

    if (!passwordIsValid) throw new UnauthorizedException();
  }

  async generateUserToken(): Promise<void> {
    const { userType, user_id } = this.user;

    const response = await this.tokenService.generate({ userType, user_id });

    if (!response || !response.token)
      throw new Error('TOKEN DOES NOT PROVIDED');
    else this.token = response.token;
  }

  async start({
    login,
    password,
  }: IAuthUserService.Params): IAuthUserService.Response {
    await this.checkUserAlreadyExists(login);
    await this.checkPasswordIsValid(password);
    await this.generateUserToken();
    return { status: 'Sucess', token: this.token };
  }
}

export { AuthUserService };
