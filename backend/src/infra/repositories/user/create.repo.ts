import { Injectable, Logger } from '@nestjs/common';
import { ICreateUserRepo } from '@root/domain';
import { PrismaService } from '@root/infra';

@Injectable()
class CreateUserRepo implements ICreateUserRepo {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: Logger,
  ) {}

  async create(user: ICreateUserRepo.Params): ICreateUserRepo.Response {
    try {
      const { user_id } = await this.prisma.user.create({
        data: user,
      });
      return { user_id };
    } catch (err) {
      this.logger.log('Erro ao criar usuario no banco de dados...');
      this.logger.error(err.message);
      throw new Error('QUERY_ERROR');
    }
  }
}

export { CreateUserRepo };
