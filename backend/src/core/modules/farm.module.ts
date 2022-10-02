import { Module } from '@nestjs/common';
import { farmsProviders } from '../providers/modules';

@Module({
  providers: farmsProviders,
})
export class UserModule {}
