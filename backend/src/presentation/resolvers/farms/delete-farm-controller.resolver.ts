import { Inject, Logger } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { IDeleteFarmController, IDeleteFarmService } from '@root/domain';
import { FARM_SERVICE } from '@root/shared';
import {
  logFinishRequestDelete,
  logInitRequest,
} from '@utils/usecases/logs-request';

@Resolver()
class DeleteFarmResolver implements IDeleteFarmController {
  constructor(
    private readonly logger: Logger,
    @Inject(FARM_SERVICE.DELETE)
    private readonly delFarmService: IDeleteFarmService,
  ) {}

  @Mutation()
  async delFarm(
    @Args('data') data: IDeleteFarmController.Params,
  ): IDeleteFarmController.Response {
    try {
      logInitRequest(this.logger, 'Iniciando a deleção de Fazenda...');
      await this.delFarmService.start(data);
      logFinishRequestDelete(this.logger, false);
      return { status: 'Sucess' };
    } catch (err) {
      logFinishRequestDelete(this.logger, true, err.message);
      return { status: 'Fail', error: err.message };
    }
  }
}

export { DeleteFarmResolver };
