import { Inject, Logger } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { IAuthUserController, IAuthUserService } from '@contracts/index';
import { Public } from '@root/data';
import {
  logFinishRequestAuth,
  logInitRequest,
} from '@root/shared/usecases/logs-request';

@Resolver('Users')
class AuthUserResolver implements IAuthUserController {
  constructor(
    private readonly logger: Logger,
    @Inject('IAuthUserService')
    private readonly authUserService: IAuthUserService,
  ) {}

  @Mutation()
  @Public()
  async authUser(
    @Context('dataSources') { userDS }: any,
    @Args('data') data: IAuthUserController.Params,
  ): IAuthUserController.Response {
    try {
      logInitRequest(this.logger, 'Autenticando Usuario...');
      const response = await this.authUserService.start(data);
      logFinishRequestAuth(this.logger, false);
      return await userDS.handleResponse(response);
    } catch (err) {
      logFinishRequestAuth(this.logger, true, err.message);

      return { status: 'Fail', error: err.message };
    }
  }
}

export { AuthUserResolver };
