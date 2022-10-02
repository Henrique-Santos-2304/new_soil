import {
  CreateFarmDTO,
  ICreateFarmRepo,
  ICreateFarmService,
  IFindFarmsRepo,
  IFindUserRepo,
  UserModel,
} from '@contracts/index';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
class CreateFarmService implements ICreateFarmService {
  constructor(
    @Inject('IFindFarmsRepo') private readonly findFarmRepo: IFindFarmsRepo,
    @Inject('IFindUserRepo') private readonly findUserRepo: IFindUserRepo,
    @Inject('ICreateFarmRepo') private readonly createFarmRepo: ICreateFarmRepo,
  ) {}

  async checkFarmAlreadyExistsInDb(farm_id: string): Promise<void> {
    const farmAlreadyExists = await this.findFarmRepo.by_id({ farm_id });

    if (farmAlreadyExists) throw new Error('Farm Already Exists');
  }

  async checkUserCreatorExistsInDb(user_id: string): Promise<UserModel> {
    const userExists = await this.findUserRepo.by_id({ user_id });

    if (!userExists) throw new Error('Does Not Found User');

    return userExists;
  }

  verifyUserToHaveAcessForCreateFarm(userType: string): void {
    if (userType !== 'MASTER' && userType !== 'DEALER') {
      throw new UnauthorizedException();
    }
  }

  async createNewFarmInDb(farm: CreateFarmDTO): Promise<{ farm_id: string }> {
    const createdUser = await this.createFarmRepo.create(farm);

    if (!createdUser) throw new Error('Does not possible to create a new farm');
    return createdUser;
  }

  async start(farm: CreateFarmDTO): ICreateFarmService.Response {
    await this.checkFarmAlreadyExistsInDb(farm.farm_id);
    const { userType } = await this.checkUserCreatorExistsInDb(farm.created_by);
    this.verifyUserToHaveAcessForCreateFarm(userType);
    const { farm_id } = await this.createNewFarmInDb(farm);
    return { status: 'Sucess', farm_id };
  }
}

export { CreateFarmService };
