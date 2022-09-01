import { Module, Provider } from '@nestjs/common';
import { CreateUserService } from '@usecases/users/create.service';

const createService: Provider = {
  provide: 'ICreateUserService',
  useClass: CreateUserService,
};

@Module({
  providers: [createService],
})
export class UserModule {}
