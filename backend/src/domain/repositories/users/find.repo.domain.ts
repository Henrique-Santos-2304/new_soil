import { CreateUserDto, UserModel } from '@root/domain/models';

/*
  Repositório para acesso ao banco de dados, com a função de buscar um usuario no banco de dados

  ****************************************************************************

  @Params: 
      by_login = { login }
      by_id = { user_id }
    
  *****************************************************************
    @Response: 
      Em caso de erro retornar = new Error("QUERY ERROR")
      Em caso de achar o usuario = retorna todos os dados do usuario<UserModel> com a senha criptografada

  ******************************************************************

*/
interface IFindUserRepo {
  by_login({ login }: IFindUserByLogin.Params): IFindUserByLogin.Response;
  by_id({ user_id }: IFindUserById.Params): IFindUserById.Response;
}

namespace IFindUserByLogin {
  export type Params = { login: CreateUserDto['login'] };
  export type Response = Promise<UserModel | undefined>;
}

namespace IFindUserById {
  export type Params = { user_id: UserModel['user_id'] };
  export type Response = Promise<UserModel | undefined>;
}

export { IFindUserRepo, IFindUserByLogin, IFindUserById };
