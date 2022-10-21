import { Provider } from '@nestjs/common';
import { FindAuthorizeService } from '@usecases/index';

const findAuthorizeServiceProvider: Provider = {
  provide: 'IFindAllAuthorizeService',
  useClass: FindAuthorizeService,
};

export { findAuthorizeServiceProvider };
