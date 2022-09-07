import { Module } from '@nestjs/common';
import { userProviders, userControllersProviders } from '../providers';

@Module({
  providers: [...userProviders, ...userControllersProviders],
})
export class UserModule {}
