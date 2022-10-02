import {
  CreateFarmDTO,
  ICreateFarmRepo,
  ICreateFarmService,
  IFindFarmsRepo,
  IFindUserRepo,
} from '@contracts/index';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
class CreateFarmService implements ICreateFarmService {
  constructor(
    @Inject('IFindFarmsRepo') private readonly findFarmRepo: IFindFarmsRepo,
    @Inject('IFindUserRepo') private readonly findUserRepo: IFindUserRepo,
    @Inject('ICreateFarmRepo') private readonly createFarmRepo: ICreateFarmRepo,
  ) {}
  async start(farm: CreateFarmDTO): ICreateFarmService.Response {
    const farmAlreadyExists = await this.findFarmRepo.by_id({
      farm_id: farm.farm_id,
    });

    if (farmAlreadyExists) throw new Error('Farm Already Exists');

    const userExists = await this.findUserRepo.by_id({
      user_id: farm.created_by,
    });

    if (!userExists) throw new Error('Does Not Found User');

    console.log(userExists);
    if (userExists.userType === 'USER' || userExists.userType === 'ADMIN') {
      console.log('Unauthorized User');
      throw new UnauthorizedException();
    }

    const createdUser = await this.createFarmRepo.create(farm);

    if (!createdUser) throw new Error('Does not possible to create a new farm');
    return { status: 'Sucess', farm_id: createdUser.farm_id };
  }
}

export { CreateFarmService };
