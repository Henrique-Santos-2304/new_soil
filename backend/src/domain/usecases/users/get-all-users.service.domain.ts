import { CreateUserDto, UserModel } from '@contracts/index';

/*
  Serviço para lógica de fluxo para criação de um novo Usuario

   *****************************************************************
    @Params: void
    
  *****************************************************************
    @Response: 
      Em caso de sucesso: {
        status: 'Sucess',
        users: UserModel[]
      }, 
      Em caso de erro: só segue o fluxo deixando para o controller retornar o erro
    
  ****************************************************************
  Fluxo de Trabalho:

  1 - Conectar com IFindUserRepo e buscar todos os usuarios no banco de dados
      1 - Retornar os usuarios ou array vazio 

*/

interface IGetAllUserService {
  start(): IGetAllUserService.Response;
}

namespace IGetAllUserService {
  export type Response = Promise<Omit<UserModel, 'password'>[]>;
}

export { IGetAllUserService };
