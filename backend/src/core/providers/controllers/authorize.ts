import { Provider } from '@nestjs/common';
import { GetAuthorizationsResolver } from '@root/presentation/resolvers/authorize/find-all-authorize.resolver';

const getAuthorizeControllerProvider: Provider = {
  provide: 'IGetAuthorizationsController',
  useClass: GetAuthorizationsResolver,
};

export { getAuthorizeControllerProvider };
