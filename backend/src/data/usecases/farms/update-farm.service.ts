import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import {
  CreateFarmDTO,
  FarmModel,
  IFindFarmsRepo,
  IUpdateFarmRepo,
  IUpdateFarmService,
  UpdateFarmDTO,
} from '@root/domain';
import {
  AlreadyExistsError,
  NotCreatedError,
  NotFoundError,
} from '@root/shared';
import { AmbiguousData } from '@utils/index';

@Injectable()
class UpdateFarmService implements IUpdateFarmService {
  constructor(
    @Inject('IFindFarmsRepo') private readonly findFarmRepo: IFindFarmsRepo,
    @Inject('IUpdateFarmRepo') private readonly updateFarmRepo: IUpdateFarmRepo,
  ) {}

  async checkFarmExist(farm_id: CreateFarmDTO['farm_id']): Promise<FarmModel> {
    const farm = await this.findFarmRepo.by_id({ farm_id });
    if (!farm) throw new NotFoundError('Farm');

    return farm;
  }

  async checkAllDataEquals(
    oldFarm: CreateFarmDTO,
    newFarm: IUpdateFarmService.Params['newFarm'],
  ): Promise<void> {
    if (
      oldFarm.farm_id === newFarm.farm_id &&
      oldFarm.farm_city === newFarm.farm_city &&
      oldFarm.farm_name === newFarm.farm_name &&
      oldFarm.farm_lat === newFarm.farm_lat &&
      oldFarm.farm_lng === newFarm.farm_lng
    ) {
      throw new AmbiguousData('Farm');
    }
  }

  async checkUserToHaveAutorizationForUpdateFarm(
    user: IUpdateFarmService.Params['user'],
    farm: CreateFarmDTO,
  ) {
    const userIsMaster = user.userType === 'MASTER';
    const userIsOwner = farm.owner_id === user.user_id;
    const userIsDealer = farm.dealers.some((dealer) => dealer === user.user_id);

    if (!userIsMaster && !userIsDealer && !userIsOwner)
      throw new UnauthorizedException();
  }

  async updateFarm(
    newFarm: UpdateFarmDTO & {
      updated_by: FarmModel['updated_by'];
    },
  ) {
    const farm = await this.updateFarmRepo.put({ ...newFarm });

    if (!farm) throw new NotCreatedError('Farm');
    return farm;
  }

  async checkFarmIdUpdated(oldFarmId: string, newFarmId: string) {
    if (oldFarmId !== newFarmId) {
      const farm = await this.findFarmRepo.by_id({ farm_id: newFarmId });

      if (farm) throw new AlreadyExistsError('Farm');
    }
  }

  async start({
    user,
    newFarm,
  }: IUpdateFarmService.Params): IUpdateFarmService.Response {
    const oldFarm = await this.checkFarmExist(newFarm.farm_id);
    await this.checkUserToHaveAutorizationForUpdateFarm(user, oldFarm);
    await this.checkAllDataEquals(oldFarm, newFarm);
    await this.checkFarmIdUpdated(oldFarm.farm_id, newFarm.farm_id);
    return await this.updateFarm({ ...newFarm, updated_by: user.user_id });
  }
}

export { UpdateFarmService };
