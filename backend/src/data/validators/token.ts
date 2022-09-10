import { IGenerateUserToken, ITokenService } from '@contracts/index';
import { Logger } from '@nestjs/common';
import jwt from 'jsonwebtoken';

class TokenService implements ITokenService {
  private readonly secretKey = process.env.TOKEN_SECRET as jwt.Secret;
  private readonly expiresIn = '150h';

  constructor(private readonly logger: Logger) {}

  async generate({
    userType,
    user_id,
  }: IGenerateUserToken.Params): IGenerateUserToken.Response {
    try {
      const token = jwt.sign({ user_id, userType }, this.secretKey, {
        expiresIn: this.expiresIn,
      });

      return token;
    } catch (err) {
      this.logger.log('Erro ao gerar token jwt');
      this.logger.error(err);
      throw new Error('TOKEN ERROR');
    }
  }

  async checkIsValid({ token }: { token: string }): Promise<boolean> {
    try {
      const TokenValid = await jwt.verify(token, this.secretKey);

      if (!TokenValid) throw new Error('TOKEN ERROR');
      return true;
    } catch (err) {
      this.logger.log('Erro ao gerar token jwt');
      this.logger;
      throw new Error('TOKEN ERROR');
    }
  }
}

export { TokenService };
