import { Injectable } from '@nestjs/common';
import { IGetAllFarmsByUserService } from '@contracts/index';

@Injectable()
class GetFarmsByUser implements IGetAllFarmsByUserService {
  start({
    user_id,
  }: IGetAllFarmsByUserService.Params): IGetAllFarmsByUserService.Response {
    throw new Error('Method not implemented.');
  }
}

export { GetFarmsByUser };
