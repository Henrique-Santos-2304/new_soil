import { Module } from '@nestjs/common';
import { allProviders } from '../providers';

@Module({
  providers: [...allProviders],
})
export class UserModule {}
