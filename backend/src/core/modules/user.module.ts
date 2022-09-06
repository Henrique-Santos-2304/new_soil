import { Logger, Module, Provider } from '@nestjs/common';
import { EncrypterData } from '@root/data/validators/encrypter';
import { CreateUserRepo } from '@root/infra/repositories/user/create.repo';
import { FindUserRepo } from '@root/infra/repositories/user/find.repo';
import { CreateUserService } from '@usecases/users/create.service';
import { PrismaModule } from './prisma.module';

const createService: Provider = {
  provide: 'ICreateUserService',
  useClass: CreateUserService,
};

const createRepo: Provider = {
  provide: 'ICreateUserRepo',
  useClass: CreateUserRepo,
};

const findByLoginRepo: Provider = {
  provide: 'IFindUserRepo',
  useClass: FindUserRepo,
};

const encrypterProvider: Provider = {
  provide: 'IEncrypterData',
  useClass: EncrypterData
}

const repos = [createRepo, findByLoginRepo];
const services = [createService];
const providers = [...repos, ...services, Logger, FindUserRepo, encrypterProvider];

@Module({ providers, exports: [...repos], imports: [PrismaModule] })
export class UserModule {}
