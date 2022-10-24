import { Injectable, Logger } from '@nestjs/common';
import { CreateAuthorizeDto } from '@root/domain';
import { ICreateAuthorizeRepo } from '@root/domain/repositories/authorize/create-authorize.domain';
import { PrismaService } from '@root/infra';
import { QueryError } from '@root/shared/errors/querry-error';

@Injectable()
class CreateAuthorizeRepo implements ICreateAuthorizeRepo {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: Logger,
  ) {}
  async create(authorize: CreateAuthorizeDto): ICreateAuthorizeRepo.Response {
    try {
      return await this.prisma.authorize.create({
        data: { ...authorize },
        select: { authorize_id: true },
      });
    } catch (err) {
      this.logger.log('Erro ao criar nova authorização...');
      this.logger.error(err.message);
      throw new QueryError();
    }
  }
}

export { CreateAuthorizeRepo };
