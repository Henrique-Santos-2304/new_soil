import { Inject, Logger } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';

import {
  IFindAllAuthorizeService,
  IGetAuthorizationsController,
} from '@root/domain';

@Resolver()
class GetAuthorizationsResolver implements IGetAuthorizationsController {
  constructor(
    private readonly logger: Logger,
    @Inject('IFindAllAuthorizeService')
    private readonly findAuthorizeService: IFindAllAuthorizeService,
  ) {}

  logInitRequest(): void {
    this.logger.warn('');
    this.logger.log(`Buscando pedidos de altorização...`);
  }

  logFinishRequest(err: boolean, message?: string): void {
    const messageSucess = `Busca realizada com sucesso...\n`;
    const messageError = 'Busca realizada Finalizada com erros...\n';
    this.logger.log(err ? messageError : messageSucess);
    message && this.logger.error(message);
  }

  @Query()
  async getAuthorizations(): IGetAuthorizationsController.Response {
    try {
      this.logInitRequest();
      const response = await this.findAuthorizeService.start();
      this.logFinishRequest(false);
      return response;
    } catch (error) {
      this.logFinishRequest(true, error.message);
      return { status: 'Fail', error: error.message };
    }
  }
}

export { GetAuthorizationsResolver };
