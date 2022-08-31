import { Module } from '@nestjs/common';
import { graphqlModule } from '@modules/index';

@Module({
  imports: [graphqlModule],
})
export class AppModule {}
