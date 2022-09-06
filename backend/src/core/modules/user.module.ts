import {  Module,  } from '@nestjs/common';
import { PrismaModule } from './prisma.module';
import {userProviders} from '../providers'


@Module({ providers: userProviders, imports: [PrismaModule] })
export class UserModule {}
