import { CreateFarmDTO, ICreateFarmRepo } from '@contracts/index';
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@root/infra';

@Injectable()
class CreateFarmRepo implements ICreateFarmRepo {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: Logger,
  ) {}
  async create(farm: CreateFarmDTO): ICreateFarmRepo.Response {
    return { farm_id: '' };
  }
}

export { CreateFarmRepo };
