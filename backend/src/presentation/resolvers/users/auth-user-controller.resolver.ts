import { Inject, Logger } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { IAuthUserController, IAuthUserService } from '@contracts/index';

@Resolver()
class AuthUserResolver implements IAuthUserController {
  constructor(
    @Inject('IAuthUserService')
    private readonly authUserService: IAuthUserService,
  ) {}

  logInitRequest(loginData: IAuthUserController.Params) {
    const { login } = loginData;
    Logger.log(
      `Recebido dados para autenticação de usuario... ${JSON.stringify({
        login,
        password: '*********',
      })} `,
    );
  }

  logFinishRequest(err: boolean) {
    const messageSucess = `Usuario autenticado com sucesso...\n`;
    const messageError =
      'Requisição para autenticar Usuario Finalizada com erros..';
    Logger.log(err ? messageError : messageSucess);
  }

  @Mutation()
  async authUser(
    @Args('data') data: IAuthUserController.Params,
  ): IAuthUserController.Response {
    try {
      this.logInitRequest(data);
      const response = await this.authUserService.start(data);
      return response;
    } catch (err) {
      this.logFinishRequest(true);
      return { status: 'Fail', error: err.message };
    }
  }
}

export { AuthUserResolver };
