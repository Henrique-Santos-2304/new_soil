import { IDeleteFarmService } from '@root/domain';

class DeleteFarmService implements IDeleteFarmService {
  start({ user_id }: IDeleteFarmService.Params): IDeleteFarmService.Response {
    throw new Error('Method not implemented.');
  }
}

export { DeleteFarmService };
