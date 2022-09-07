import { CreateUserDto, UserModel } from '@root/domain/models';

/*
  Repositório para acesso ao banco de dados, com a função de criar novo usuario

  ****************************************************************************

  @Params: {
      login: string, 
      password: string, 
      userType: SUDO ou USER
    }
    
  *****************************************************************
    @Response: 
      Em caso de erro retornar = new Error("QUERY ERROR")
      Em caso de sucesso = Novo Usuario com os dados recebidos,
         e user_id criado automaticamente pelo banco de dados 

  ******************************************************************

*/

interface ICreateUserRepo {
  create(user: ICreateUserRepo.Params): ICreateUserRepo.Response;
}

namespace ICreateUserRepo {
  export type Params = CreateUserDto;
  export type Response = Promise<{ user_id: UserModel['user_id'] }>;
}

export { ICreateUserRepo };
