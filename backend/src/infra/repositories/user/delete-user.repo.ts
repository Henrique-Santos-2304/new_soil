import { IDeleteUserRepo } from '@contracts/index';
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@db/index';
import { QueryError } from '@root/shared';

@Injectable()
class DeleteUserRepo implements IDeleteUserRepo {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: Logger,
  ) {}

  async by_id({ user_id }: IDeleteUserRepo.Params): IDeleteUserRepo.Response {
    try {
      await this.prisma.user.delete({ where: { user_id } });
    } catch (err) {
      this.logger.log('Erro ao deletar usuário...');
      this.logger.error(err.message);
      throw new QueryError();
    }
  }
}

export { DeleteUserRepo };
