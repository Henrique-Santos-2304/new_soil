import { Provider } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard, JwtStrategy, TokenService } from '@root/data';
import { VALIDATORS_SERVICE } from '@root/shared';

const tokenProvider: Provider = {
  provide: VALIDATORS_SERVICE.TOKEN,
  useClass: TokenService,
};

const authGuardProvider: Provider = {
  provide: APP_GUARD,
  useClass: JwtAuthGuard,
};

const jwtStrategyProvider = JwtStrategy;

export { tokenProvider, authGuardProvider, jwtStrategyProvider };
