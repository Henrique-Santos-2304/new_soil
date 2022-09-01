import { Global, Module } from '@nestjs/common';
import { PrismaService } from '@root/infra';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
