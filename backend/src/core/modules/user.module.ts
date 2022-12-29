import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { userProviders } from '../providers/modules';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.TOKEN_SECRET,
        signOptions: { expiresIn: '150h' },
      }),
    }),
  ],
  providers: userProviders,
  exports: ['ICreateUserService'],
})
export class UserModule {}
