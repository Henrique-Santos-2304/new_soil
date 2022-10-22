import { Inject, Logger } from '@nestjs/common';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { ICreateFarmController, ICreateFarmService } from '@root/domain';
import {
  logFinishRequestCreate,
  logInitRequest,
} from '@root/shared/usecases/logs-request';

@Resolver()
class CreateFarmResolver implements ICreateFarmController {
  constructor(
    private readonly logger: Logger,
    @Inject('ICreateFarmService')
    private readonly createFarmService: ICreateFarmService,
  ) {}

  @Mutation()
  async createFarm(
    @Args('data') data: ICreateFarmController.Params,
  ): ICreateFarmController.Response {
    try {
      // Loga o inicio da requisição
      logInitRequest(this.logger, 'Iniciando criação de nova fazenda');
      const user = await this.createFarmService.start(data);
      logFinishRequestCreate(this.logger, false);
      return user;
    } catch (err) {
      logFinishRequestCreate(this.logger, true, err.message);

      return { status: 'Fail', error: err.message };
    }
  }
}

export { CreateFarmResolver };
