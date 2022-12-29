import { Inject, Injectable } from '@nestjs/common';
import {
  FarmModel,
  IFindFarmsRepo,
  IFindUserRepo,
  IGetAllFarmsByUserService,
  UserModel,
} from '@contracts/index';
import { NotFoundError } from '@root/shared/errors';
import { FARM_REPO, USER_REPO } from '@root/shared';

@Injectable()
class GetFarmsByUser implements IGetAllFarmsByUserService {
  private user_id: string;

  constructor(
    @Inject(FARM_REPO.FIND) private readonly findFarmRepo: IFindFarmsRepo,
    @Inject(USER_REPO.FIND) private readonly findUserRepo: IFindUserRepo,
  ) {}

  async filterUserTypeAndGetYourFarms(userType: string): Promise<FarmModel[]> {
    if (userType === 'MASTER') return await this.getAllFarmsOfMaster();
    else return await this.getAllByRole(userType);
  }

  async getAllFarmsOfMaster(): Promise<FarmModel[]> {
    const farms = await this.findFarmRepo.all();
    if (!farms) throw new NotFoundError('Farm');

    return farms;
  }

  async getAllByRole(userType: string): Promise<FarmModel[]> {
    const farms = await this.findFarmRepo.by_role({
      role: userType,
      user_id: this.user_id,
    });

    if (!farms) throw new NotFoundError('Farm');

    return farms;
  }

  async getUser(user_id: string): Promise<UserModel> {
    this.user_id = user_id;
    const user = await this.findUserRepo.by_id({ user_id });
    if (!user) throw new NotFoundError('User');
    return user;
  }

  async start({
    user_id,
  }: IGetAllFarmsByUserService.Params): IGetAllFarmsByUserService.Response {
    const user = await this.getUser(user_id);

    return this.filterUserTypeAndGetYourFarms(user.userType);
  }
}

export { GetFarmsByUser };
