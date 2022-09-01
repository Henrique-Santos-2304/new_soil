import { Module, Provider } from '@nestjs/common';
import { CreateUserRepo } from '@root/infra/repositories/user/create.repo';
import { CreateUserService } from '@usecases/users/create.service';

const createService: Provider = {
  provide: 'ICreateUserService',
  useClass: CreateUserService,
};

const createRepo: Provider = {
  provide: 'ICreateUserRepo',
  useClass: CreateUserRepo,
};

const repos = [createRepo];
const services = [createService];

@Module({
  providers: [...repos, ...services],
})
export class UserModule {}
