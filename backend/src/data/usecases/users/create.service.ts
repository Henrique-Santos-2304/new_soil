import { Injectable } from '@nestjs/common';
import { ICreateUserService } from '@root/domain';

@Injectable()
export class CreateUserService implements ICreateUserService {
  async start(user: ICreateUserService.Params): ICreateUserService.Response {
    return { ...user, user_id: '' };
  }
}
