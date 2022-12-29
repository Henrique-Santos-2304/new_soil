import { Injectable, Logger } from '@nestjs/common';
import { ICreateUserRepo } from '@root/domain';
import { PrismaService } from '@root/infra';
import { QueryError } from '@root/shared/errors';

@Injectable()
class CreateUserRepo implements ICreateUserRepo {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: Logger,
  ) {}

  async create(user: ICreateUserRepo.Params): ICreateUserRepo.Response {
    try {
      const userResponse = await this.prisma.user.create({
        data: user,
        select: {
          user_id: true,
        },
      });
      return { user_id: userResponse.user_id };
    } catch (err) {
      this.logger.log('Erro ao criar usuario no banco de dados...');
      this.logger.error(err.message);
      throw new QueryError();
    }
  }
}

export { CreateUserRepo };
