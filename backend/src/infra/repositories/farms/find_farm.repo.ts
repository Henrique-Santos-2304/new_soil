import {
  IFindFarmById,
  IFindFarmsByUser,
  IFindFarmsRepo,
  IGetAllFarms,
} from '@contracts/index';
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@root/infra';
import { QueryError } from '@root/shared/errors';

@Injectable()
class FindFarmRepo implements IFindFarmsRepo {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: Logger,
  ) {}

  async by_user({
    user_id,
  }: IFindFarmsByUser.Params): IFindFarmsByUser.Response {
    try {
      const farms = await this.prisma.farm.findMany({
        where: { owner_id: user_id },
      });

      return farms;
    } catch (err) {
      this.logger.log('Erro ao buscar fazenda no banco de dados...');
      this.logger.error(err.message);
      throw new QueryError();
    }
  }

  async by_id({ farm_id }: IFindFarmById.Params): IFindFarmById.Response {
    try {
      const farm = await this.prisma.farm.findFirst({ where: { farm_id } });
      return farm;
    } catch (err) {
      this.logger.log('Erro ao buscar fazenda no banco de dados...');
      this.logger.error(err.message);
      throw new QueryError();
    }
  }

  async all(): IGetAllFarms.Response {
    try {
      const farms = await this.prisma.farm.findMany();
      return farms;
    } catch (err) {
      this.logger.log('Erro ao buscar fazenda no banco de dados...');
      this.logger.error(err.message);
      throw new QueryError();
    }
  }
}

export { FindFarmRepo };
