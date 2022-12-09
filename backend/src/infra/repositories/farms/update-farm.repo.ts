import { IUpdateFarmRepo } from '@contracts/index';
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@root/infra';
import { QueryError } from '@root/shared/errors';

@Injectable()
class UpdateFarmRepo implements IUpdateFarmRepo {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: Logger,
  ) {}

  async put({
    farm_id,
    farm,
  }: IUpdateFarmRepo.Params): IUpdateFarmRepo.Response {
    try {
      const farmCreated = await this.prisma.farm.update({
        data: { ...farm },
        where: { farm_id },
        select: {
          farm_id: true,
        },
      });

      return farmCreated;
    } catch (err) {
      this.logger.log('Erro ao atualizar fazenda no banco de dados...');
      this.logger.error(err.message);
      throw new QueryError();
    }
  }
}

export { UpdateFarmRepo };
