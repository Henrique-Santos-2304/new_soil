import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import {
  IAddUserIntoFarmService,
  ICreateUserRepo,
  IFindFarmsRepo,
  IFindUserRepo,
  IUpdateFarmRepo,
} from '@contracts/index';

@Injectable()
class AddUserIntoFarmService implements IAddUserIntoFarmService {
  constructor(
    @Inject('IFindFarmsRepo') private readonly findFarmRepo: IFindFarmsRepo,
    @Inject('IUpdateFarmRepo') private readonly updateFarmRepo: IUpdateFarmRepo,
    @Inject('IFindUserRepo') private readonly findUserRepo: IFindUserRepo,
    @Inject('ICreateUserRepo') private readonly createUserRepo: ICreateUserRepo,
  ) {}

  async start({
    farm_id,
    auth,
    data,
  }: IAddUserIntoFarmService.Params): IAddUserIntoFarmService.Response {
    throw new Error('Method not implemented.');
  }
}

export { AddUserIntoFarmService };
