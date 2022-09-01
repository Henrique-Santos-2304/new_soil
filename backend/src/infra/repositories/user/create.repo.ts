import { Injectable, Logger } from '@nestjs/common';
import { ICreateUserRepo, UserModel } from '@root/domain';
import { PrismaService } from '@root/infra';

@Injectable()
class CreateUserRepo implements ICreateUserRepo {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: ICreateUserRepo.Params): ICreateUserRepo.Response {
    try {
      const userCreated: UserModel = await this.prisma.user.create({
        data: user,
      });
      return userCreated;
    } catch (err) {
      Logger.log('Erro ao criar usuario no banco de dados...');
      Logger.error(err);
    }
  }
}

export { CreateUserRepo };
