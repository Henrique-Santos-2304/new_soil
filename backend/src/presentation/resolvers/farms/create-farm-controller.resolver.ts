import { Inject, Logger } from '@nestjs/common';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { ICreateFarmController, ICreateFarmService } from '@root/domain';

@Resolver()
class CreateFarmResolver implements ICreateFarmController {
  constructor(
    @Inject('ICreateFarmService')
    private readonly createFarmService: ICreateFarmService,
  ) {}

  logInitRequest(farm: ICreateFarmController.Params): void {
    Logger.warn('');
    Logger.log(`Cadastrando nova Fazenda... ${JSON.stringify(farm, null, 2)}`);
  }

  logFinishRequest(err: boolean, message?: string): void {
    const messageSucess = `Fazenda cadastrado com sucesso...\n`;
    const messageError =
      'Requisição para criar nova fazenda Finalizada com erros...\n';
    Logger.log(err ? messageError : messageSucess);
    message && Logger.error(message);
  }

  @Mutation()
  async createFarm(
    @Args('data') data: ICreateFarmController.Params,
  ): ICreateFarmController.Response {
    try {
      // Loga o inicio da requisição
      this.logInitRequest(data);
      const user = await this.createFarmService.start(data);
      this.logFinishRequest(false);
      return user;
    } catch (err) {
      this.logFinishRequest(true, err.message);
      return { status: 'Fail', error: err.message };
    }
  }
}

export { CreateFarmResolver };
