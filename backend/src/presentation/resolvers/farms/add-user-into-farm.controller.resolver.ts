import { IAddUserIntoFarmService } from '@contracts/index';
import { Inject, Logger } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { IAddUserIntoFarmController } from '@root/domain/controllers/farms/add-user-into-farm.controller.domain';
import {
  FARM_SERVICE,
  logFinishRequestUpdate,
  logInitRequest,
} from '@utils/index';

@Resolver()
class AddUserIntoFarmResolver implements IAddUserIntoFarmController {
  constructor(
    private readonly logger: Logger,
    @Inject(FARM_SERVICE.ADD_USER)
    private readonly addUserIntoFarmService: IAddUserIntoFarmService,
  ) {}

  @Mutation()
  async addUserIntoFarm(
    @Args('data') data: IAddUserIntoFarmController.Params,
  ): IAddUserIntoFarmController.Response {
    try {
      // Loga o inicio da requisição
      logInitRequest(
        this.logger,
        `Adicionando novo usuario na fazenda fazenda ${data.farm_id}`,
      );

      const response = await this.addUserIntoFarmService.start(data);
      logFinishRequestUpdate(this.logger, false);
      return { status: 'Sucess', ...response };
    } catch (err) {
      logFinishRequestUpdate(this.logger, true, err.message);

      return { status: 'Fail', error: err.message };
    }
  }
}

export { AddUserIntoFarmResolver };
