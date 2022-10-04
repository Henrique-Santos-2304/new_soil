import { Module } from '@nestjs/common';
import {
  graphqlModule,
  UserModule,
  PrismaModule,
  FarmModule,
} from '@modules/index';

@Module({
  imports: [graphqlModule, PrismaModule, UserModule, FarmModule],
})
export class AppModule {}
