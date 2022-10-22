import { Inject, Logger } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';

import {
  IFindAllAuthorizeService,
  IGetAuthorizationsController,
} from '@root/domain';
import {
  logFinishRequestFind,
  logInitRequest,
} from '@root/shared/usecases/logs-request';

@Resolver()
class GetAuthorizationsResolver implements IGetAuthorizationsController {
  constructor(
    private readonly logger: Logger,
    @Inject('IFindAllAuthorizeService')
    private readonly findAuthorizeService: IFindAllAuthorizeService,
  ) {}

  @Query()
  async getAuthorizations(): IGetAuthorizationsController.Response {
    try {
      logInitRequest(this.logger, 'Buscando pedidos de altorização...');
      const response = await this.findAuthorizeService.start();
      logFinishRequestFind(this.logger, false);
      return response;
    } catch (error) {
      logFinishRequestFind(this.logger, true, error.message);
      return { status: 'Fail', error: error.message };
    }
  }
}

export { GetAuthorizationsResolver };
