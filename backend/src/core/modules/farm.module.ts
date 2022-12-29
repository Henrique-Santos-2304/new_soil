import { Module } from '@nestjs/common';
import { farmsProviders } from '../providers';
import { UserModule } from './user.module';

@Module({
  imports: [UserModule],
  providers: farmsProviders,
})
export class FarmModule {}
