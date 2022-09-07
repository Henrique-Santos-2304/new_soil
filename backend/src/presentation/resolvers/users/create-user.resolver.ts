import { Inject, Logger } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ICreateUserController, ICreateUserService } from '@root/domain';

@Resolver()
class CreateUserResolver implements ICreateUserController {
  constructor(
    @Inject('ICreateUserService')
    private readonly createUserService: ICreateUserService,
  ) {}

  logInitRequest(user: ICreateUserController.Params) {
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

  /* Provisório só está para o graphql não reclamar de falta de query*/
  @Query()
  async getUserByLogin(@Args('login') login: string) {
    return '';
  }

  @Mutation()
  async createUser(
    @Args('data') data: ICreateUserController.Params,
  ): ICreateUserController.Response {
    try {
      // Loga o inicio da requisição
      this.logInitRequest(data);
      const user = await this.createUserService.start(data);
      this.logFinishRequest(false);
      return user;
    } catch (err) {
      this.logFinishRequest(true);
      return { status: 'Fail', error: err.message };
    }
  }
}

export { CreateUserResolver };
