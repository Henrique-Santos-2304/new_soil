import { Inject, Injectable } from '@nestjs/common';
import { IFindFarmsRepo, IGetFarmByIdService } from '@root/domain';
import { FARM_REPO } from '@root/shared';

@Injectable()
class GetFarmByIdService implements IGetFarmByIdService {
  constructor(
    @Inject(FARM_REPO.FIND) private readonly findFarmRepo: IFindFarmsRepo,
  ) {}

  async start({
    farm_id,
  }: IGetFarmByIdService.Params): IGetFarmByIdService.Response {
    throw new Error('Method not implemented.');
  }
}

export { GetFarmByIdService };
