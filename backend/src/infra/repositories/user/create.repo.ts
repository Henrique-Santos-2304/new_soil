import { Injectable, Logger } from '@nestjs/common';
import { ICreateUserRepo, UserModel } from '@root/domain';
import { PrismaService } from '@root/infra';

@Injectable()
class CreateUserRepo implements ICreateUserRepo {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: Logger,
  ) {}

  async create(user: ICreateUserRepo.Params): ICreateUserRepo.Response {
    try {
      const userCreated: UserModel = await this.prisma.user.create({
        data: user,
      });
      return userCreated;
    } catch (err) {
      this.logger.log('Erro ao criar usuario no banco de dados...');
      this.logger.error(err.message);
    }
  }
}

export { CreateUserRepo };
