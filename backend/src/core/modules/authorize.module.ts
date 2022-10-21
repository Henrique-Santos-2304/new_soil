import { Module } from '@nestjs/common';
import { allAuthorizesProviders } from '../providers/modules/authorize';

@Module({
  providers: allAuthorizesProviders,
})
export class AuthorizeModule {}
