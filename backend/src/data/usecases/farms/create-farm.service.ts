import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import {
  ICreateFarmService,
  IFindFarmsRepo,
  IFindUserRepo,
  ICreateFarmRepo,
  UserModel,
  CreateFarmDTO,
} from '@contracts/index';
import {
  AlreadyExistsError,
  NotCreatedError,
  NotFoundError,
} from '@root/shared/errors';

@Injectable()
class CreateFarmService implements ICreateFarmService {
  constructor(
    @Inject('IFindFarmsRepo') private readonly findFarmRepo: IFindFarmsRepo,
    @Inject('IFindUserRepo') private readonly findUserRepo: IFindUserRepo,
    @Inject('ICreateFarmRepo') private readonly createFarmRepo: ICreateFarmRepo,
  ) {}

  async verifyDealersAdminUsersExists(
    dealer: string[],
    admins: string[],
    users: string[],
  ): Promise<void> {
    if (dealer && dealer.length > 0) {
      for (const user of dealer) await this.checkUserExistsInDb(user, 'DEALER');
    }

    if (admins && admins.length > 0) {
      for (const user of admins) await this.checkUserExistsInDb(user, 'ADMIN');
    }

    if (users && users.length > 0) {
      for (const user of users) await this.checkUserExistsInDb(user, 'USER');
    }
  }

  async checkFarmAlreadyExistsInDb(farm_id: string): Promise<void> {
    const farmAlreadyExists = await this.findFarmRepo.by_id({ farm_id });

    if (farmAlreadyExists) throw new AlreadyExistsError('Farm');
  }

  async checkUserExistsInDb(user_id: string, type: string): Promise<UserModel> {
    const userExists = await this.findUserRepo.by_id({ user_id });

    if (!userExists) throw new NotFoundError(`User type: ${type}`);

    return userExists;
  }

  async verifyUserToHaveAcessForCreateFarm(userType: string): Promise<void> {
    if (userType !== 'MASTER' && userType !== 'DEALER') {
      throw new UnauthorizedException();
    }
  }

  async createNewFarmInDb(farm: CreateFarmDTO): Promise<{ farm_id: string }> {
    const createdUser = await this.createFarmRepo.create(farm);

    if (!createdUser) throw new NotCreatedError('Farm');
    return createdUser;
  }

  async start(farm: ICreateFarmService.Params): ICreateFarmService.Response {
    await this.checkFarmAlreadyExistsInDb(farm.farm_id);
    await this.checkUserExistsInDb(farm.owner_id, 'OWNER');
    await this.verifyDealersAdminUsersExists(
      farm.dealers,
      farm.admins,
      farm.users,
    );
    const { userType } = await this.checkUserExistsInDb(
      farm.created_by,
      'CREATOR',
    );

    await this.verifyUserToHaveAcessForCreateFarm(userType);
    const { farm_id } = await this.createNewFarmInDb(farm);
    return { status: 'Sucess', farm_id };
  }
}

export { CreateFarmService };
