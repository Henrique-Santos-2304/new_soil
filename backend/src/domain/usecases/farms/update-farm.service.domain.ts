import { CreateFarmDTO } from '@contracts/index';
import { UserRequestAuth } from '@root/domain/utils/user-request';

/*
  Serviço para lógica de fluxo para criação de um novo Fazenda

   *****************************************************************
    @Params: {
      farm_id: string;
      farm_name: string;
      farm_city: string;
      farm_lat: number;
      farm_lng: number;
      owner: string  *** Usuario dono da fazenda ***

      created_by: string  *** Usuario criador da fazenda ***
      updated_by: string *** Ultimo usuario a atualizar a fazenda ***
      admins: string[];
      users?: string[];
      dealers: string[]
    }
    
  *****************************************************************
    @Response: 
      Em caso de sucesso: {
        status: 'Sucess'
      }, 
      Em caso de erro: só segue o fluxo deixando para o controller retornar o erro
    
  ****************************************************************
  Fluxo de Trabalho:

  1 - Conectar com IFindFarmRepo e verificar se a fazenda existe,
      
      1 - Se não existir levanta erro "Farm Does not found"
      2 - Se Existir segue o fluxo 

  2 - Verificar se UserType, para liberar atualização da fazenda
      1 - Se for Master ou revendedor libera a atualização da fazenda
      3 - Se não retornar Unauthorized

  3- Verificar os tipo de dados recebidos são diferentes dos existentes na tabela
      - se for igual finaliza a request com erro "New data is equal to a old data"

  3 - Se na atualização vier novo usuario ou for atualizado o dono,
      Conectar com IFindUserRepo para verificar se usuario existe
      1 - Se não existir levantar error User Does Not Found
      2 - Se não segue o fluxo
      
  4 - Conecta com IUpdateFarmRepo com a função de atualizar essa fazenda
      no banco de dados 

  5 - Retorna uma das opções mostradas acima no @Response de acordo 
      com o resultado do fluxo de serviço
*/

interface IUpdateFarmService {
  start(farm: IUpdateFarmService.Params): IUpdateFarmService.Response;
}

namespace IUpdateFarmService {
  export type Params = { user: UserRequestAuth; newFarm: CreateFarmDTO };
  export type Response = Promise<{ farm_id: string }>;
}

export { IUpdateFarmService };
