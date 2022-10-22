import { Inject, Logger } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Public } from '@root/data/index';
import { ICreateUserController, ICreateUserService } from '@root/domain';
import {
  logFinishRequestCreate,
  logFinishRequestFind,
  logInitRequest,
} from '@root/shared/usecases/logs-request';

@Resolver()
class CreateUserResolver implements ICreateUserController {
  constructor(
    private readonly logger: Logger,
    @Inject('ICreateUserService')
    private readonly createUserService: ICreateUserService,
  ) {}

  @Mutation()
  @Public()
  async createUser(
    @Args('data') data: ICreateUserController.Params,
  ): ICreateUserController.Response {
    try {
      // Loga o inicio da requisição
      logInitRequest(this.logger, 'Iniciando criação de novo usuario');
      const user = await this.createUserService.start(data);
      logFinishRequestCreate(this.logger, false);
      return user;
    } catch (err) {
      logFinishRequestCreate(this.logger, true, err.message);
      return { status: 'Fail', error: err.message };
    }
  }
}

export { CreateUserResolver };
