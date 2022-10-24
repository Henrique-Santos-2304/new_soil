import { Injectable, Logger } from '@nestjs/common';
import {
  IFindUserById,
  IFindUserByLogin,
  IFindUserRepo,
  IFindUserWithoutLoginPassword,
  UserModel,
} from '@root/domain';
import { PrismaService } from '@root/infra';
import { QueryError } from '@root/shared/errors';

@Injectable()
class FindUserRepo implements IFindUserRepo {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: Logger,
  ) {}

  async without_login({
    login,
  }: IFindUserWithoutLoginPassword.Params): IFindUserWithoutLoginPassword.Response {
    try {
      const user = await this.prisma.user.findFirst({
        where: { login },
        select: { user_id: true, userType: true, password: true },
      });

      return user;
    } catch (err) {
      this.logger.log('Erro ao buscar usuario no banco de dados...');
      this.logger.error(err.message);
      throw new QueryError();
    }
  }

  async by_login({
    login,
  }: IFindUserByLogin.Params): IFindUserByLogin.Response {
    try {
      const user = await this.prisma.user.findFirst({ where: { login } });
      return user;
    } catch (err) {
      this.logger.log('Erro ao buscar usuario no banco de dados...');
      this.logger.error(err.message);
      throw new QueryError();
    }
  }

  async by_id({ user_id }: IFindUserById.Params): IFindUserById.Response {
    try {
      const user = await this.prisma.user.findFirst({ where: { user_id } });
      return user;
    } catch (err) {
      this.logger.log('Erro ao buscar usuario no banco de dados...');
      this.logger.error(err.message);
      throw new QueryError();
    }
  }

  async all(): Promise<Array<Omit<UserModel, 'password'>>> {
    try {
      const user = await this.prisma.user.findMany({
        select: { user_id: true, login: true, userType: true },
      });
      return user;
    } catch (err) {
      this.logger.log('Erro ao buscar usuarios no banco de dados...');
      this.logger.error(err.message);
      throw new QueryError();
    }
  }
}

export { FindUserRepo };
