import { Logger, Module } from '@nestjs/common';
import { graphqlModule, UserModule, PrismaModule } from '@modules/index';

@Module({
  imports: [graphqlModule, UserModule, PrismaModule],
})
export class AppModule {}
