import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import {
  CreateFarmDTO,
  CreateUserDto,
  FarmModel,
  IAddUserIntoFarmService,
  ICreateUserRepo,
  IFindFarmsRepo,
  IFindUserRepo,
  IUpdateFarmRepo,
  UserModel,
} from '@contracts/index';
import {
  AlreadyExistsError,
  NotCreatedError,
  NotFoundError,
} from '@root/shared';

@Injectable()
class AddUserIntoFarmService implements IAddUserIntoFarmService {
  private farmData: FarmModel;
  private userData: UserModel;
  private add_user_id: UserModel['user_id'];

  constructor(
    @Inject('IFindFarmsRepo') private readonly findFarmRepo: IFindFarmsRepo,
    @Inject('IUpdateFarmRepo') private readonly updateFarmRepo: IUpdateFarmRepo,
    @Inject('IFindUserRepo') private readonly findUserRepo: IFindUserRepo,
    @Inject('ICreateUserRepo') private readonly createUserRepo: ICreateUserRepo,
  ) {}

  async checkFarmExist(farm_id: CreateFarmDTO['farm_id']): Promise<void> {
    this.farmData = await this.findFarmRepo.by_id({ farm_id });

    if (!this.farmData) throw new NotFoundError('Farm');
  }

  async checkUserToHaveAuthorize(
    user_id: UserModel['user_id'],
    userType: UserModel['userType'],
  ) {
    const userIsMaster = userType === 'MASTER';
    const userIsOwner = this.farmData.owner_id === user_id;
    const userIsDealer =
      this.farmData &&
      this.farmData.dealers.some((dealer) => dealer === user_id);
    const userIsAdmin =
      this.farmData && this.farmData.admins.some((admin) => admin === user_id);

    if (!userIsMaster && !userIsOwner && !userIsDealer && !userIsAdmin)
      throw new UnauthorizedException();
  }

  async checkUserAlreadyExists(login: UserModel['login']): Promise<void> {
    const userExists = await this.findUserRepo.by_login({ login });
    if (userExists) throw new AlreadyExistsError('User');
  }

  async createUser(user: CreateUserDto): Promise<void> {
    const userExists = await this.createUserRepo.create({ ...user });
    if (!userExists) throw new NotCreatedError('User');
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
    const farm = await this.updateFarmRepo.addUser({
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
    await this.checkUserToHaveAuthorize(auth.user_id, auth.userType);
    await this.checkUserAlreadyExists(data.add_user.login);
    await this.createUser(data.add_user);

    const dataAddTofarm = this.checkTableAddedUser(data.table);
    const response = await this.addUserToFarm(dataAddTofarm);

    return { farm_id: response.farm_id, user_id: this.add_user_id };
  }
}

export { AddUserIntoFarmService };
