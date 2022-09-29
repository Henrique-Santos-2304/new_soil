import { Inject, Logger } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Public } from '@root/data/index';
import { ICreateUserController, ICreateUserService } from '@root/domain';

@Resolver()
class CreateUserResolver implements ICreateUserController {
  constructor(
    @Inject('ICreateUserService')
    private readonly createUserService: ICreateUserService,
  ) {}

  logInitRequest(user: any) {
    const { password, ...rest } = user;
    Logger.warn('');
    Logger.log(
      `Cadastrando novo Usuario... ${JSON.stringify({
        ...rest,
        password: '*********',
      })} `,
    );
  }

  logFinishRequest(err: boolean) {
    const messageSucess = `Usuario cadastrado com sucesso...\n`;
    const messageError =
      'Requisição para criar novo Usuario Finalizada com erros...\n';
    Logger.log(err ? messageError : messageSucess);
  }

  @Mutation()
  @Public()
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
