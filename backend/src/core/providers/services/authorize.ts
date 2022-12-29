import { Provider } from '@nestjs/common';
import { AUTHORIZE_SERVICE } from '@root/shared';
import { FindAuthorizeService } from '@usecases/index';

const findAuthorizeServiceProvider: Provider = {
  provide: AUTHORIZE_SERVICE.FIND,
  useClass: FindAuthorizeService,
};

export { findAuthorizeServiceProvider };
