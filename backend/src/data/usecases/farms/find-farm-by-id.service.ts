import { Inject, Injectable } from '@nestjs/common';
import { FarmModel, IFindFarmsRepo, IGetFarmByIdService } from '@root/domain';
import { FARM_REPO, NotFoundError } from '@root/shared';

@Injectable()
class GetFarmByIdService implements IGetFarmByIdService {
  constructor(
    @Inject(FARM_REPO.FIND) private readonly findFarmRepo: IFindFarmsRepo,
  ) {}

  async checkFarmExits(farm_id: FarmModel['farm_id']): Promise<FarmModel> {
    const farm = await this.findFarmRepo.by_id({ farm_id });

    if (!farm) throw new NotFoundError('Farm');
    return farm;
  }

  async start({
    farm_id,
  }: IGetFarmByIdService.Params): IGetFarmByIdService.Response {
    const farm = await this.checkFarmExits(farm_id);
    return farm;
  }
}

export { GetFarmByIdService };
