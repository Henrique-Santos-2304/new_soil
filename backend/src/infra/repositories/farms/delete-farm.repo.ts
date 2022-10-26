import {
  IDeleteFarmByIdRepo,
  IDeleteFarmByUser,
  IDeleteFarmRepo,
} from '@contracts/index';
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@db/index';
import { QueryError } from '@root/shared/errors';

@Injectable()
class DeleteFarmRepo implements IDeleteFarmRepo {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: Logger,
  ) {}

  async by_user({
    user_id,
  }: IDeleteFarmByUser.Params): IDeleteFarmByUser.Response {
    try {
      await this.prisma.farm.deleteMany({ where: { owner_id: user_id } });
    } catch (err) {
      this.logger.log('Erro ao deletar fazenda...');
      this.logger.error(err.message);
      throw new QueryError();
    }
  }

  async by_id({
    farm_id,
  }: IDeleteFarmByIdRepo.Params): IDeleteFarmByIdRepo.Response {
    try {
      await this.prisma.farm.delete({ where: { farm_id } });
    } catch (err) {
      this.logger.log('Erro ao deletar fazenda...');
      this.logger.error(err.message);
      throw new QueryError();
    }
  }
}

export { DeleteFarmRepo };
