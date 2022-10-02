import {
  CreateFarmDTO,
  ICreateFarmService,
  IFindFarmsRepo,
  IFindUserRepo,
} from '@contracts/index';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
class CreateFarmService implements ICreateFarmService {
  constructor(
    @Inject('IFindFarmsRepo') private readonly findFarmService: IFindFarmsRepo,
    @Inject('IFindUserRepo') private readonly findUserRepo: IFindUserRepo,
  ) {}
  async start(farm: CreateFarmDTO): ICreateFarmService.Response {
    return { status: 'Sucess', farm_id: farm.farm_id };
  }
}

export { CreateFarmService };
