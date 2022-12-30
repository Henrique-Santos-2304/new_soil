import { UserModel } from '@contracts/index';

/*
  Serviço para lógica de fluxo para criação de um novo Usuario

   *****************************************************************
    @Params: {
      user_id: string
    }
    
  *****************************************************************
    @Response: 
      Em caso de sucesso: {
        status: 'Sucess',
        user: UserModel
      }, 
      Em caso de erro: só segue o fluxo deixando para o controller retornar o erro
    
  ****************************************************************
  Fluxo de Trabalho:

  1 - Conectar com IFindUserRepo e buscar o usuario
      1 - Retornar o usuario caso encontrado 
      2 - Retornar erro User Not Found

*/

interface IGetUserByIdService {
  start({ user_id }: IGetUserByIdService.Params): IGetUserByIdService.Response;
}

namespace IGetUserByIdService {
  export type Params = { user_id: string };

  export type Response = Promise<Omit<UserModel, 'password'>>;
}

export { IGetUserByIdService };
