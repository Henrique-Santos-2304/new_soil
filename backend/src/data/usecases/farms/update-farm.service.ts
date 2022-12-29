import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import {
  CreateFarmDTO,
  FarmModel,
  IFindFarmsRepo,
  IUpdateFarmRepo,
  IUpdateFarmService,
  UpdatedFarmDTORepo,
} from '@root/domain';
import {
  AlreadyExistsError,
  FARM_REPO,
  NotCreatedError,
  NotFoundError,
} from '@root/shared';
import { AmbiguousData } from '@utils/index';

@Injectable()
class UpdateFarmService implements IUpdateFarmService {
  private thisFarm: FarmModel;

  private dataFarmNotEqual: UpdatedFarmDTORepo;

  constructor(
    @Inject(FARM_REPO.FIND) private readonly findFarmRepo: IFindFarmsRepo,
    @Inject(FARM_REPO.UPDATE) private readonly updateFarmRepo: IUpdateFarmRepo,
  ) {}

  async checkFarmExist(farm_id: CreateFarmDTO['farm_id']): Promise<FarmModel> {
    this.thisFarm = await this.findFarmRepo.by_id({ farm_id });
    if (!this.thisFarm) throw new NotFoundError('Farm');
    return this.thisFarm;
  }

  async checkAllDataEquals(
    newFarm: IUpdateFarmService.Params['newFarm'],
  ): Promise<void> {
    if (
      this.thisFarm.farm_id === newFarm.farm_id &&
      this.thisFarm.farm_city === newFarm.farm_city &&
      this.thisFarm.farm_name === newFarm.farm_name &&
      this.thisFarm.farm_lat === newFarm.farm_lat &&
      this.thisFarm.farm_lng === newFarm.farm_lng
    ) {
      throw new AmbiguousData('Farm');
    }

    if (this.thisFarm.farm_id !== newFarm.farm_id)
      this.dataFarmNotEqual = {
        ...this.dataFarmNotEqual,
        farm_id: newFarm.farm_id,
      };

    if (this.thisFarm.farm_name !== newFarm.farm_name)
      this.dataFarmNotEqual = {
        ...this.dataFarmNotEqual,
        farm_name: newFarm.farm_name,
      };

    if (this.thisFarm.farm_city !== newFarm.farm_city)
      this.dataFarmNotEqual = {
        ...this.dataFarmNotEqual,
        farm_city: newFarm.farm_city,
      };

    if (this.thisFarm.farm_lat !== newFarm.farm_lat)
      this.dataFarmNotEqual = {
        ...this.dataFarmNotEqual,
        farm_lat: newFarm.farm_lat,
      };

    if (this.thisFarm.farm_lng !== newFarm.farm_lng)
      this.dataFarmNotEqual = {
        ...this.dataFarmNotEqual,
        farm_lng: newFarm.farm_lng,
      };
  }

  async checkUserToHaveAutorizationForUpdateFarm(
    user: IUpdateFarmService.Params['user'],
  ) {
    const userIsMaster = user.userType === 'MASTER';
    const userIsOwner = this.thisFarm.owner_id === user.user_id;
    const userIsDealer = this.thisFarm.dealers.some(
      (dealer) => dealer === user.user_id,
    );

    if (!userIsMaster && !userIsDealer && !userIsOwner)
      throw new UnauthorizedException();
  }

  async updateFarm(farm_id: string, newFarm: UpdatedFarmDTORepo) {
    const farm = await this.updateFarmRepo.put({
      farm_id,
      farm: { ...newFarm },
    });

    if (!farm) throw new NotCreatedError('Farm');
    return farm;
  }

  async checkFarmIdUpdated(newFarmId: string) {
    if (this.thisFarm.farm_id !== newFarmId) {
      const farm = await this.findFarmRepo.by_id({ farm_id: newFarmId });

      if (farm) throw new AlreadyExistsError('Farm');
    }
  }

  async start({
    farm_id,
    user,
    newFarm,
  }: IUpdateFarmService.Params): IUpdateFarmService.Response {
    await this.checkFarmExist(farm_id);
    await this.checkUserToHaveAutorizationForUpdateFarm(user);
    await this.checkAllDataEquals(newFarm);
    await this.checkFarmIdUpdated(newFarm.farm_id);

    return await this.updateFarm(farm_id, {
      ...this.dataFarmNotEqual,
      updated_by: user.user_id,
    });
  }
}

export { UpdateFarmService };
