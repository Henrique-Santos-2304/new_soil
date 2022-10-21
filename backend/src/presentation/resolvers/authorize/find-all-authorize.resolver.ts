import { Inject, Logger } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';

import {
  IFindAllAuthorizeService,
  IGetAuthorizationsController,
} from '@root/domain';

@Resolver()
class GetAuthorizationsResolver implements IGetAuthorizationsController {
  constructor(
    @Inject('IFindAllAuthorizeService')
    private readonly findAuthorizeService: IFindAllAuthorizeService,
  ) {}

  logInitRequest(): void {
    Logger.warn('');
    Logger.log(`Buscando pedidos de altorização...`);
  }

  logFinishRequest(err: boolean, message?: string): void {
    const messageSucess = `Busca realizada com sucesso...\n`;
    const messageError = 'Busca realizada Finalizada com erros...\n';
    Logger.log(err ? messageError : messageSucess);
    message && Logger.error(message);
  }

  @Query()
  getAuthorizations(): IGetAuthorizationsController.Response {
    throw new Error('Method not implemented.');
  }
}

export { GetAuthorizationsResolver };
