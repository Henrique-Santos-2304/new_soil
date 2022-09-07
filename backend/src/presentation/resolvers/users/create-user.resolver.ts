import { Inject, Logger } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ICreateUserController, ICreateUserService } from '@root/domain';

@Resolver()
class CreateUserResolver implements ICreateUserController {
  constructor(
    @Inject('ICreateUserService')
    private readonly createUserService: ICreateUserService,
  ) {}

  /* Provisório só está para o graphql não reclamar de falta de query*/
  @Query()
  async getUserByLogin(@Args('login') login: string) {
    return '';
  }

  @Mutation()
  async createUser(
    @Args('data') data: ICreateUserController.Params,
  ): ICreateUserController.Response {
    Logger.log(
      `Recebido novo Usuario para cadastro... ${JSON.stringify(data)} `,
    );
    try {
      const user = await this.createUserService.start(data);
      Logger.log(`Usuario cadastrado com sucesso...\n`);
      return user;
    } catch (err) {
      console.log(err);
      return { status: 'Fail', error: err.message };
    }
  }
}

export { CreateUserResolver };
