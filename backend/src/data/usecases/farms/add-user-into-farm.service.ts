import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import {
  CreateFarmDTO,
  CreateUserDto,
  FarmModel,
  IAddUserIntoFarmService,
  ICreateUserService,
  IFindFarmsRepo,
  IUpdateFarmRepo,
  UserModel,
} from '@contracts/index';
import { FARM_REPO, NotFoundError, USER_SERVICE } from '@root/shared';
import { checkUserToHaveAuthorize } from '../utils';

@Injectable()
class AddUserIntoFarmService implements IAddUserIntoFarmService {
  private farmData: FarmModel;
  private add_user_id: UserModel['user_id'];

  constructor(
    @Inject(FARM_REPO.FIND) private readonly findFarmRepo: IFindFarmsRepo,
    @Inject(FARM_REPO.UPDATE) private readonly updateFarmRepo: IUpdateFarmRepo,
    @Inject(USER_SERVICE.CREATE)
    private readonly createUserRepo: ICreateUserService,
  ) {}

  async checkFarmExist(farm_id: CreateFarmDTO['farm_id']): Promise<void> {
    this.farmData = await this.findFarmRepo.by_id({ farm_id });

    if (!this.farmData) throw new NotFoundError('Farm');
  }

  async createUser(user: CreateUserDto): Promise<void> {
    const userExists = await this.createUserRepo.start({
      ...user,
      internal_password: process.env.INTERNAL_PASSWORD,
    });
    this.add_user_id = userExists.user_id;
  }

  checkTableAddedUser(
    table: 'admins' | 'users' | 'dealers',
  ): IAddUserIntoFarmService.Adduser {
    if (table === 'admins')
      return { admins: [...this.farmData.admins, this.add_user_id] };
    else if (table === 'users')
      return { users: [...this.farmData.users, this.add_user_id] };
    else if (table === 'dealers')
      return { dealers: [...this.farmData.dealers, this.add_user_id] };
  }

  async addUserToFarm(data: IAddUserIntoFarmService.Adduser) {
    const farm = await this.updateFarmRepo.addOrDeleteUser({
      farm_id: this.farmData.farm_id,
      data: { ...data },
    });

    if (!farm) throw new Error('User not added into farm');

    return farm;
  }

  async start({
    farm_id,
    auth,
    data,
  }: IAddUserIntoFarmService.Params): IAddUserIntoFarmService.Response {
    await this.checkFarmExist(farm_id);
    await checkUserToHaveAuthorize({
      farm: this.farmData,
      user: { user_id: auth.user_id, userType: auth.userType },
    });
    await this.createUser(data.add_user);

    const dataAddTofarm = this.checkTableAddedUser(data.table);
    const response = await this.addUserToFarm(dataAddTofarm);

    return { farm_id: response.farm_id, user_id: this.add_user_id };
  }
}

export { AddUserIntoFarmService };
