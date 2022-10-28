import { AuthorizeModel } from '@contracts/index';

/*
  Serviço para lógica de fluxo para buscar todas os pedidos authirzação para criar novos dados

   *****************************************************************
    @Params: void
    
  *****************************************************************
    @Response: 
      Em caso de sucesso: {
        status: 'Sucess',
        users: AuthorizeModel[]
      }, 
      Em caso de erro: só segue o fluxo deixando para o controller retornar o erro
    
  ****************************************************************
  Fluxo de Trabalho:

  1 - Conectar com IFindAuthorizeRepo e buscar todos as autorizações no banco de dados
      1 - Retornar as autorizações ou array vazio 

*/

interface IFindAllAuthorizeService {
  start(): IFindAllAuthorizeService.Response;
}

namespace IFindAllAuthorizeService {
  export type Response = Promise<{
    status: 'Sucess';
    authorize: AuthorizeModel[];
  }>;
}

export { IFindAllAuthorizeService };
