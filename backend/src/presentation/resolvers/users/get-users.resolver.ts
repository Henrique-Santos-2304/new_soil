import { Inject, Logger } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { IGetAllUserController, IGetUserController } from '@root/domain';
import { IGetAllUserService } from '@contracts/index';

@Resolver()
class GetUsersResolver implements IGetUserController {
  constructor(
    @Inject('IGetAllUserService')
    private readonly getAllUserService: IGetAllUserService,
  ) {}

  logInitRequest() {
    Logger.warn('');

    Logger.log(`Busca de usuarios iniciada.....`);
  }

  logFinishRequest(err: boolean, message?: string) {
    const messageSucess = `Busca de usúarios realizada com sucesso...\n`;
    const messageError =
      'Requisição para buscar Usúarios Finalizada com erros...\n';
    Logger.log(err ? messageError : messageSucess);
    err && message && Logger.error(message);
  }

  @Query()
  async getUsers(): IGetAllUserController.Response {
    try {
      this.logInitRequest();
      const users = await this.getAllUserService.start();
      this.logFinishRequest(false);
      return { status: 'Sucess', users };
    } catch (err) {
      this.logFinishRequest(true, err.message);
      return { status: 'Fail', error: err.message };
    }
  }
}

export { GetUsersResolver };
