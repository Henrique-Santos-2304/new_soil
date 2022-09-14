import { Injectable, Logger } from '@nestjs/common';
import { IGenerateUserToken, ITokenService } from '@contracts/index';
import * as jwt from 'jsonwebtoken';

@Injectable()
class TokenService implements ITokenService {
  private readonly secretKey = process.env.TOKEN_SECRET;
  private readonly expiresIn = '150h';

  constructor(private readonly logger: Logger) {}

  async generate({
    userType,
    user_id,
  }: IGenerateUserToken.Params): IGenerateUserToken.Response {
    try {
      const token = jwt.sign(
        { user_id, userType },
        this.secretKey as jwt.Secret,
        {
          expiresIn: this.expiresIn,
        },
      );

      return { token };
    } catch (err) {
      this.logger.log('Erro ao gerar token jwt');
      this.logger.error(err);
      throw new Error('TOKEN ERROR');
    }
  }

  async checkIsValid({ token }: { token: string }): Promise<boolean> {
    try {
      const TokenValid = jwt.verify(token, this.secretKey as jwt.Secret);

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
