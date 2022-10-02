import { Provider } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard, JwtStrategy, TokenService } from '@root/data';

const tokenProvider: Provider = {
  provide: 'ITokenService',
  useClass: TokenService,
};

const authGuardProvider: Provider = {
  provide: APP_GUARD,
  useClass: JwtAuthGuard,
};

const jwtStrategyProvider = JwtStrategy;

export { tokenProvider, authGuardProvider, jwtStrategyProvider };
