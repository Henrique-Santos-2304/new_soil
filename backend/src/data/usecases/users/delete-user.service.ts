import { Inject, Injectable } from '@nestjs/common';
import {
  IDeleteUserService,
  IFindFarmById,
  IFindFarmsRepo,
  IFindUserRepo,
} from '@root/domain';
import { FARM_REPO, FARM_SERVICE, USER_REPO } from '@root/shared';

@Injectable()
class DeleteUserService implements IDeleteUserService {
  constructor(
    @Inject(USER_REPO.FIND) private readonly findUserRepo: IFindUserRepo,
    @Inject(FARM_REPO.FIND) private readonly findFarmService: IFindFarmsRepo,

    @Inject(USER_REPO.DELETE) private readonly deleteUserRepo: any,
  ) {}

  async start({
    user_id,
    auth,
  }: IDeleteUserService.Params): IDeleteUserService.Response {
    throw new Error('Method not implemented.');
  }
}

export { DeleteUserService };
