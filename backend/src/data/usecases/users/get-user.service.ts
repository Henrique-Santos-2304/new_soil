import { Inject, Injectable } from '@nestjs/common';
import { IFindUserRepo, IGetAllUserService } from '@contracts/index';
import { USER_REPO } from '@root/shared';

@Injectable()
class GetAllUserService implements IGetAllUserService {
  constructor(
    @Inject(USER_REPO.FIND) private readonly findUserRepo: IFindUserRepo,
  ) {}

  getUsersInDb = async () => await this.findUserRepo.all();

  async start(): IGetAllUserService.Response {
    const user = await this.getUsersInDb();
    return user;
  }
}

export { GetAllUserService };
