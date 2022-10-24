import { CreateFarmDTO, ICreateFarmRepo } from '@contracts/index';
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@root/infra';
import { QueryError } from '@root/shared/errors';

@Injectable()
class CreateFarmRepo implements ICreateFarmRepo {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: Logger,
  ) {}

  async create(farm: CreateFarmDTO): ICreateFarmRepo.Response {
    try {
      const farmCreated = await this.prisma.farm.create({
        data: farm,
        select: {
          farm_id: true,
        },
      });

      return farmCreated;
    } catch (err) {
      this.logger.log('Erro ao criar fazenda no banco de dados...');
      this.logger.error(err.message);
      throw new QueryError();
    }
  }
}

export { CreateFarmRepo };
