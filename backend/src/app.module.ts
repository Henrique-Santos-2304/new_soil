import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { graphqlModule, UserModule, PrismaModule } from '@modules/index';

const pathEnv = `${process.cwd()}/.tests.env`;
const pathEnvTest = `${process.cwd()}/.env`;

Logger.log(`Env: ${pathEnv}`);
Logger.log(`test Env: ${pathEnvTest}`);

@Module({
  imports: [
    graphqlModule,
    UserModule,
    PrismaModule,
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'test' ? pathEnvTest : pathEnv,
    }),
  ],
})
export class AppModule {}
