import { Injectable } from '@nestjs/common';
import { CreateFarmDTO, IUpdateFarmService } from '@root/domain';

@Injectable()
class UpdateFarmService implements IUpdateFarmService {
  start(farm: IUpdateFarmService.Params): IUpdateFarmService.Response {
    throw new Error('Method not implemented.');
  }
}

export { UpdateFarmService };
