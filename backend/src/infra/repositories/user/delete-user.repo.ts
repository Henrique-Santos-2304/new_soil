import { IDeleteUserRepo } from '@contracts/index';
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@db/index';

@Injectable()
class DeleteUserRepo implements IDeleteUserRepo {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: Logger,
  ) {}

  async by_id({ user_id }: IDeleteUserRepo.Params): IDeleteUserRepo.Response {
    return;
  }
}

export { DeleteUserRepo };
