import { Inject, Injectable } from '@nestjs/common';
import { IFindUserRepo, IGetAllUserService, UserModel } from '@contracts/index';

@Injectable()
class GetAllUserService implements IGetAllUserService {
  constructor(
    @Inject('IFindUserRepo') private readonly findUserRepo: IFindUserRepo,
  ) {}

  async start(): IGetAllUserService.Response {
    return [] as UserModel[];
  }
}

export { GetAllUserService };
