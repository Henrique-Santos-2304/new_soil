import { Inject, Injectable } from '@nestjs/common';
import { IFindUserRepo, IGetAllUserService } from '@contracts/index';

@Injectable()
class GetAllUserService implements IGetAllUserService {
  constructor(
    @Inject('IFindUserRepo') private readonly findUserRepo: IFindUserRepo,
  ) {}

  getUsersInDb = async () => await this.findUserRepo.all();

  async start(): IGetAllUserService.Response {
    const user = await this.getUsersInDb();
    return user;
  }
}

export { GetAllUserService };
