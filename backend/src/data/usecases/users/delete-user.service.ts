import { Inject, Injectable } from '@nestjs/common';
import {
  IDeleteUserService,
  IFindFarmsRepo,
  IGetUserByIdService,
} from '@root/domain';
import { FARM_REPO, FARM_SERVICE, USER_REPO, USER_SERVICE } from '@root/shared';

@Injectable()
class DeleteUserService implements IDeleteUserService {
  constructor(
    @Inject(USER_SERVICE.FIND_BY_ID)
    private readonly findUserByIdService: IGetUserByIdService,
    @Inject(USER_REPO.DELETE) private readonly deleteUserRepo: any,
    @Inject(FARM_REPO.FIND) private readonly findFarmRepo: IFindFarmsRepo,
  ) {}

  async start({
    user_id,
    auth,
  }: IDeleteUserService.Params): IDeleteUserService.Response {
    return;
  }
}

export { DeleteUserService };
