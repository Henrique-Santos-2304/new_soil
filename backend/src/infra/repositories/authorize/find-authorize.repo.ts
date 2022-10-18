import { IFindAuthorizeRepo, IGetallAuthorize } from '@contracts/index';
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@root/infra';

@Injectable()
class FindAuthorizeRepo implements IFindAuthorizeRepo {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: Logger,
  ) {}

  async all(): IGetallAuthorize.Response {
    try {
      return await this.prisma.authorize.findMany();
    } catch (err) {
      this.logger.log('Erro ao buscar autorizações no banco de dados');
      this.logger.error(err.message);
      throw new Error('QUERY ERROR');
    }
  }
}

export { FindAuthorizeRepo };
