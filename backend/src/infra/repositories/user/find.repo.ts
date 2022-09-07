import { Injectable, Logger } from '@nestjs/common';
import { IFindUserById, IFindUserByLogin, IFindUserRepo } from '@root/domain';
import { PrismaService } from '@root/infra';

@Injectable()
class FindUserRepo implements IFindUserRepo {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: Logger,
  ) {}

  async by_login({
    login,
  }: IFindUserByLogin.Params): IFindUserByLogin.Response {
    try {
      const user = await this.prisma.user.findFirst({ where: { login } });
      return user;
    } catch (err) {
      this.logger.log('Erro ao buscar usuario no banco de dados...');
      this.logger.error(err.message);
      throw new Error('QUERY_ERROR');
    }
  }

  async by_id({ user_id }: IFindUserById.Params): IFindUserById.Response {
    try {
      const user = await this.prisma.user.findFirst({ where: { user_id } });
      return user;
    } catch (err) {
      this.logger.log('Erro ao buscar usuario no banco de dados...');
      this.logger.error(err.message);
      throw new Error('QUERY_ERROR');
    }
  }
}

export { FindUserRepo };
