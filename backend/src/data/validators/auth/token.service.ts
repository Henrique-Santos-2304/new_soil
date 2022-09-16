import { Injectable, Logger } from '@nestjs/common';
import { IGenerateUserToken, ITokenService } from '@contracts/index';
import { JwtService } from '@nestjs/jwt';

@Injectable()
class TokenService implements ITokenService {
  private readonly secretKey = process.env.TOKEN_SECRET;
  private readonly expiresIn = '150h';

  constructor(
    private jwtService: JwtService,
    private readonly logger: Logger,
  ) {}

  async generate({
    userType,
    user_id,
  }: IGenerateUserToken.Params): IGenerateUserToken.Response {
    try {
      const token = await this.jwtService.signAsync({ userType, user_id });

      return { token };
    } catch (err) {
      this.logger.log('Erro ao gerar token jwt');
      this.logger.error(err);
      throw new Error('TOKEN ERROR');
    }
  }

  async checkIsValid({ token }: { token: string }): Promise<boolean> {
    try {
      const TokenValid = await this.jwtService.verifyAsync(token);
      if (!TokenValid) throw new Error('TOKEN ERROR');
      return true;
    } catch (err) {
      this.logger.log('Erro ao gerar token jwt');
      this.logger.error(err.message);
      throw new Error('TOKEN ERROR');
    }
  }
}

export { TokenService };
