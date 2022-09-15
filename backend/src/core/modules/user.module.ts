import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard, JwtStrategy } from '@root/data/index';
import { allProviders } from '../providers';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.TOKEN_SECRET,
        signOptions: { expiresIn: '150h' },
      }),
    }),
  ],
  providers: [
    ...allProviders,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class UserModule {}
