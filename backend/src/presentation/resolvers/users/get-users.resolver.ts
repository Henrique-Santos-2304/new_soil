import { Inject, Logger } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import {
  IGetAllUserController,
  IGetUserController,
  UserModel,
} from '@root/domain';
import { IGetAllUserService } from '@contracts/index';

@Resolver()
class GetUsersResolver implements IGetUserController {
  constructor(
    @Inject('IGetAllUserService')
    private readonly getAllUserService: IGetAllUserService,
  ) {}

  logInitRequest(user: any) {
    const { password, ...rest } = user;
    Logger.log(
      `Recebido novo Usuario para cadastro... ${JSON.stringify({
        ...rest,
        password: '*********',
      })} `,
    );
  }

  logFinishRequest(err: boolean) {
    const messageSucess = `Usuario cadastrado com sucesso...\n`;
    const messageError =
      'Requisição para criar novo Usuario Finalizada com erros..';
    Logger.log(err ? messageError : messageSucess);
  }

  @Query()
  async getUsers(): IGetAllUserController.Response {
    return [new UserModel()];
  }
}

export { GetUsersResolver };
