import { CreateFarmDTO } from '@contracts/index';

/*
  Serviço para lógica de fluxo para criação de um novo Fazenda

   *****************************************************************
    @Params: {
      farm_id: string;
      farm_name: string;
      farm_city: string;
      farm_lat: number;
      farm_lng: number;

      admins_id: string[];
      dealer_id?: string;
      user_id?: string[];
    }
    
  *****************************************************************
    @Response: 
      Em caso de sucesso: {
        status: 'Sucess'
      }, 
      Em caso de erro: só segue o fluxo deixando para o controller retornar o erro
    
  ****************************************************************
  Fluxo de Trabalho:

  1 - Conectar com IFindUserRepo e verificar se o usuario criador existe,
      
      1 - Se não existir levanta erro "User Does not found"
      2 - Se Existir segue o fluxo 

  2 - Verificar se UserType, para liberar criação da fazenda
      1 - Se for Master libera a criação da fazenda
      2 - Se for Dealer emitir uma mensagem ao usúario Master,
          liberando a criação da fazenda no sistema. 
          **** 
            Verificar e pensar melhor forma de implementar essa autorização
          ***
      3 - Se não retornar Unauthorized

  3 - Conecta com findFarmRepo e verifica se a fazenda a ser criada já existe
      1 - Se existir levanta erro "Farm Already Exists"
      2 - Se não segue o fluxo
      
  4 - Conecta com ICreateFarmRepo com a função de salvar essa nova fazenda
      no banco de dados 

  5 - Retorna uma das opções mostradas acima no @Response de acordo 
      com o resultado do fluxo de serviço
*/

interface ICreateFarmService {
  start(farm: ICreateFarmService.Params): ICreateFarmService.Response;
}

namespace ICreateFarmService {
  export type Params = CreateFarmDTO;
  export type Response = Promise<{ status: 'Sucess'; farm_id: string }>;
}

export { ICreateFarmService };
