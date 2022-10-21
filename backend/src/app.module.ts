import { Module } from '@nestjs/common';
import {
  graphqlModule,
  UserModule,
  PrismaModule,
  FarmModule,
  AuthorizeModule,
} from '@modules/index';

@Module({
  imports: [
    graphqlModule,
    PrismaModule,
    UserModule,
    FarmModule,
    AuthorizeModule,
  ],
})
export class AppModule {}
