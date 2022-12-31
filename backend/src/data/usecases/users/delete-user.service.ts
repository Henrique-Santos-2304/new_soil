import { Inject, Injectable } from '@nestjs/common';
import {
  IDeleteUserService,
  IFindFarmById,
  IFindFarmsRepo,
  IFindUserRepo,
  IGetUserByIdService,
} from '@root/domain';
import { FARM_REPO, FARM_SERVICE, USER_REPO, USER_SERVICE } from '@root/shared';

@Injectable()
class DeleteUserService implements IDeleteUserService {
  constructor(
    @Inject(USER_SERVICE.FIND_BY_ID)
    private readonly findUserByIdService: IGetUserByIdService,
    @Inject(FARM_SERVICE.FIND_BY_ID)
    private readonly findFarmService: IFindFarmsRepo,

    @Inject(USER_REPO.DELETE) private readonly deleteUserRepo: any,
  ) {}

  async start({
    user_id,
    auth,
  }: IDeleteUserService.Params): IDeleteUserService.Response {
    await this.findUserByIdService.start({ user_id });
  }
}

export { DeleteUserService };
