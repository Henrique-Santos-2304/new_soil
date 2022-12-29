import { IUpdateFarmController, IUpdateFarmService } from '@contracts/index';
import { Inject, Logger } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import {
  FARM_SERVICE,
  logFinishRequestUpdate,
  logInitRequest,
} from '@utils/index';

@Resolver()
class UpdateFarmResolver implements IUpdateFarmController {
  constructor(
    private readonly logger: Logger,
    @Inject(FARM_SERVICE.UPDATE)
    private readonly updateFarmService: IUpdateFarmService,
  ) {}

  @Mutation()
  async putFarm(
    @Args('data') data: IUpdateFarmController.Params,
  ): IUpdateFarmController.Response {
    try {
      // Loga o inicio da requisição
      logInitRequest(
        this.logger,
        `Iniciando atualização da fazenda ${data.farm_id}`,
      );

      const farm = await this.updateFarmService.start(data);
      logFinishRequestUpdate(this.logger, false);
      return { status: 'Sucess', farm_id: farm.farm_id };
    } catch (err) {
      logFinishRequestUpdate(this.logger, true, err.message);

      return { status: 'Fail', error: err.message };
    }
  }
}

export { UpdateFarmResolver };
