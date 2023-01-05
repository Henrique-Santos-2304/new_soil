import { Provider } from '@nestjs/common';
import { GetAuthorizationsResolver } from '@resolvers/index';
import { AUTHORIZE_CONTROLLER } from '@root/shared';

const getAuthorizeControllerProvider: Provider = {
  provide: AUTHORIZE_CONTROLLER.FIND,
  useClass: GetAuthorizationsResolver,
};

export { getAuthorizeControllerProvider };
