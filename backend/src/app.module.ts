import { Module } from '@nestjs/common';
import { graphqlModule, UserModule } from '@modules/index';

@Module({
  imports: [graphqlModule, UserModule],
})
export class AppModule {}
