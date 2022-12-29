import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import {
  IDeleteFarmRepo,
  IDeleteFarmService,
  IFindFarmsRepo,
  IFindUserRepo,
  UserType,
} from '@contracts/index';
import { NotFoundError } from '@root/shared/errors';
import { FARM_REPO, USER_REPO } from '@root/shared';

@Injectable()
class DeleteFarmService implements IDeleteFarmService {
  constructor(
    @Inject(FARM_REPO.FIND) private readonly findFarmRepo: IFindFarmsRepo,
    @Inject(USER_REPO.FIND) private readonly findUserRepo: IFindUserRepo,
    @Inject(FARM_REPO.DELETE) private readonly delFarmRepo: IDeleteFarmRepo,
  ) {}

  async checkAuthorizeForDeleteFarm(userType: UserType) {
    if (userType !== 'MASTER' && userType !== 'DEALER') {
      throw new UnauthorizedException();
    }
  }

  async checkUserExist(user_id: string) {
    const user = await this.findUserRepo.by_id({ user_id });

    if (!user) throw new NotFoundError('User');
  }

  async delFarmByUser(user_id: string) {
    await this.delFarmRepo.by_user({ user_id });
  }

  async checkFarmExist(farm_id: string) {
    const farm = await this.findFarmRepo.by_id({ farm_id });
    if (!farm) throw new NotFoundError('Farm');
  }

  async delFarmById(farm_id: string) {
    await this.delFarmRepo.by_id({ farm_id });
  }

  async start({
    userType,
    user_id,
    farm_id,
  }: IDeleteFarmService.Params): IDeleteFarmService.Response {
    await this.checkAuthorizeForDeleteFarm(userType);

    if (!user_id && !farm_id) {
      throw new Error(
        'user_id and farm_id not available, please set one form query',
      );
    }

    if (user_id) {
      await this.checkUserExist(user_id);
      await this.delFarmByUser(user_id);
    }

    if (farm_id) {
      await this.checkFarmExist(farm_id);
      await this.delFarmById(farm_id);
    }
  }
}

export { DeleteFarmService };
