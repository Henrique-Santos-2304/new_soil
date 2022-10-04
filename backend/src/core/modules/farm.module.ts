import { Module } from '@nestjs/common';
import { farmsProviders } from '../providers';

@Module({
  providers: farmsProviders,
})
export class FarmModule {}
