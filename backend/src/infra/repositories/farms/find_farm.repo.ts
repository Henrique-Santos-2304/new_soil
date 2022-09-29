import {
  IFindFarmById,
  IFindFarmsByUser,
  IFindFarmsRepo,
  IGetAllFarms,
} from '@contracts/index';
import { Injectable } from '@nestjs/common';

@Injectable()
class FindFarmRepo implements IFindFarmsRepo {
  by_user({ user_id }: IFindFarmsByUser.Params): IFindFarmsByUser.Response {
    throw new Error('Method not implemented.');
  }
  by_id({ farm_id }: IFindFarmById.Params): IFindFarmById.Response {
    throw new Error('Method not implemented.');
  }
  all(): IGetAllFarms.Response {
    throw new Error('Method not implemented.');
  }
}

export { FindFarmRepo };
