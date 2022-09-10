import { Injectable, Inject } from '@nestjs/common';
import {
  IAuthUserService,
  IEncrypterData,
  IFindUserRepo,
  ITokenService,
} from '@contracts/index';

@Injectable()
class AuthUserService implements IAuthUserService {
  constructor(
    @Inject('IFindUserRepo') private readonly findUserRepo: IFindUserRepo,
    @Inject('IEncrypterData') private readonly encrypter: IEncrypterData,
    @Inject('ITokenService') private readonly tokenService: ITokenService,
  ) {}

  async start({
    login,
    password,
  }: IAuthUserService.Params): IAuthUserService.Response {
    const user = await this.findUserRepo.without_login({ login });

    if (!user) throw new Error('Invalid Credentials');

    const { password: userPassword, userType, user_id } = user;

    const passwordIsValid = await this.encrypter.compare({
      old_value: userPassword,
      valueCompare: password,
    });

    if (!passwordIsValid) throw new Error('Invalid Credentials');

    const { token } = await this.tokenService.generate({ user_id, userType });

    if (!token) throw new Error('TOKEN DOES NOT PROVIDED');
    return { status: 'Sucess', token };
  }
}

export { AuthUserService };
