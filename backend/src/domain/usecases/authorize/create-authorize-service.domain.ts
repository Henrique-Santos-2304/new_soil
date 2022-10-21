import {
  AuthorizeModel,
  CreateAuthorizeDto,
  CreateFarmDTO,
} from '@contracts/index';

/*
  Serviço para lógica de fluxo para criação de um novo pedido de authorização

   *****************************************************************
    @Params: {
      farm_id: string;
      pivot_id: string;
      crated_by: string;
    }
    
  *****************************************************************
    @Response: 
      Em caso de sucesso: {
        status: 'Sucess'
      }, 
      Em caso de erro: só segue o fluxo deixando para o controller retornar o erro
    
  ****************************************************************
  Fluxo de Trabalho:

  1 - Conectar com IFindAuthorizeRepo e verificar se a authorização ja existe,
      
      1 - Se existir levanta erro "Authorize already exists"
      2 - Se não Existir segue o fluxo 
      
  4 - Conecta com ICreateAuthorizeRepo com a função de salvar essa nova autorização
      no banco de dados 

  5 - Retorna uma das opções mostradas acima no @Response de acordo 
      com o resultado do fluxo de serviço
*/

interface ICreateAuthorizeService {
  start(
    authorize: ICreateAuthorizeService.Params,
  ): ICreateAuthorizeService.Response;
}

namespace ICreateAuthorizeService {
  export type Params = CreateAuthorizeDto;
  export type Response = Promise<{
    status: 'Sucess';
    authorize_id: AuthorizeModel['authorize_id'];
  }>;
}

export { ICreateAuthorizeService };
