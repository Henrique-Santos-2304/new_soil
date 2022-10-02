import {
  CreateFarmDTO,
  ICreateFarmService,
  IFindFarmsRepo,
} from '@contracts/index';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
class CreateFarmService implements ICreateFarmService {
  constructor(
    @Inject('IFindFarmsRepo')
    private readonly findFarmService: IFindFarmsRepo,
  ) {}
  async start(farm: CreateFarmDTO): ICreateFarmService.Response {
    return { status: 'Sucess', farm_id: farm.farm_id };
  }
}

export { CreateFarmService };
