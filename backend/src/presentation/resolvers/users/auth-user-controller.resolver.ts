import { Inject, Logger } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { IAuthUserController, IAuthUserService } from '@contracts/index';
import { Public } from '@root/data';

@Resolver('Users')
class AuthUserResolver implements IAuthUserController {
  constructor(
    @Inject('IAuthUserService')
    private readonly authUserService: IAuthUserService,
  ) {}

  logInitRequest(loginData: IAuthUserController.Params) {
    Logger.warn('');
    Logger.log(
      `Autenticando Usúario... ${JSON.stringify({
        login: loginData.login,
        password: '*********',
      })} `,
    );
  }

  logFinishRequest(err: boolean, message?: string) {
    const messageSucess = `Usuario autenticado com sucesso...\n`;
    const messageError =
      'Requisição para autenticar Usuario Finalizada com erros...\n';
    Logger.log(err ? messageError : messageSucess);
    message && Logger.error(message);
  }

  @Mutation()
  @Public()
  async authUser(
    @Context('dataSources') { userDS }: any,
    @Args('data') data: IAuthUserController.Params,
  ): IAuthUserController.Response {
    try {
      this.logInitRequest(data);
      const response = await this.authUserService.start(data);
      this.logFinishRequest(false);
      return await userDS.handleResponse(response);
    } catch (err) {
      this.logFinishRequest(true, err.message);
      return { status: 'Fail', error: err.message };
    }
  }
}

export { AuthUserResolver };
