import {
  IGetAllFarmsByUserService,
  IGetFarmsController,
} from '@contracts/index';
import { Inject, Logger } from '@nestjs/common';
import { Args, Query } from '@nestjs/graphql';
import { FARM_SERVICE } from '@root/shared';
import {
  logFinishRequestFind,
  logInitRequest,
} from '@root/shared/usecases/logs-request';

class GetFarmsResolver implements IGetFarmsController {
  constructor(
    private readonly logger: Logger,
    @Inject(FARM_SERVICE.FIND)
    private readonly findFarmsByUserService: IGetAllFarmsByUserService,
  ) {}

  @Query()
  async getFarmByUser(
    @Args('data') data: IGetFarmsController.Params,
  ): IGetFarmsController.Response {
    try {
      logInitRequest(this.logger, 'Iniciando busca de Fazendas do usuario...');
      const farms = await this.findFarmsByUserService.start({
        user_id: data.user_id,
      });
      logFinishRequestFind(this.logger, false);

      return { status: 'Sucess', farms };
    } catch (err) {
      logFinishRequestFind(this.logger, true, err.message);
      return { status: 'Fail', error: err.message };
    }
  }
}

export { GetFarmsResolver };
