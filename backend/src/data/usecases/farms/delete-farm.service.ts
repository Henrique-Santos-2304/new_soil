import { Inject, UnauthorizedException } from '@nestjs/common';
import {
  IDeleteFarmRepo,
  IDeleteFarmService,
  IFindFarmsRepo,
  IFindUserRepo,
  UserType,
} from '@root/domain';
import { NotFoundError } from '@root/shared/errors';

class DeleteFarmService implements IDeleteFarmService {
  constructor(
    @Inject('IFindFarmsRepo') private readonly findFarmRepo: IFindFarmsRepo,
    @Inject('IFindUserRepo') private readonly findUserRepo: IFindUserRepo,
    @Inject('IDeleteFarmRepo') private readonly delFarmRepo: IDeleteFarmRepo,
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
