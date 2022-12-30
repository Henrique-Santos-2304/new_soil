import {
  IFindUserRepo,
  IGetUserByIdService,
  UserModel,
} from '@contracts/index';
import { Inject, Injectable } from '@nestjs/common';
import { NotFoundError, USER_REPO } from '@root/shared';

@Injectable()
class GetUserByIdService implements IGetUserByIdService {
  constructor(
    @Inject(USER_REPO.FIND) private readonly findUserRepo: IFindUserRepo,
  ) {}

  async checkUserExist(user_id: UserModel['user_id']): Promise<UserModel> {
    const getUser = await this.findUserRepo.by_id({ user_id });

    if (!getUser) throw new NotFoundError('User');
    return getUser;
  }

  async start({
    user_id,
  }: IGetUserByIdService.Params): IGetUserByIdService.Response {
    const user = await this.checkUserExist(user_id);
    delete user.password;
    return user;
  }
}

export { GetUserByIdService };
