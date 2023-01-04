import { Inject, Logger } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { IGetAllUserController, IGetUserController } from '@root/domain';
import { IGetAllUserService } from '@contracts/index';
import {
  logFinishRequestFind,
  logInitRequest,
} from '@root/shared/usecases/logs-request';
import { USER_SERVICE } from '@root/shared';

@Resolver()
class GetUsersResolver implements IGetUserController {
  constructor(
    private readonly logger: Logger,

    @Inject(USER_SERVICE.GET_ALL)
    private readonly getAllUserService: IGetAllUserService,
  ) {}

  @Query()
  async getUsers(): IGetAllUserController.Response {
    try {
      logInitRequest(this.logger, 'Busca de usuarios iniciada...');
      const users = await this.getAllUserService.start();
      logFinishRequestFind(this.logger, false);
      return { status: 'Sucess', users };
    } catch (err) {
      logFinishRequestFind(this.logger, true, err.message);
      return { status: 'Fail', error: err.message };
    }
  }
}

export { GetUsersResolver };
