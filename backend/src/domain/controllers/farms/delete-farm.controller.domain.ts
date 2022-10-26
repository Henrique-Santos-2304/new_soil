/*
  Serviço para lógica de fluxo buscar todas fazendas de acordo com usuário

   *****************************************************************
    @Params: { farm_id:string, user_id:string }
    
  *****************************************************************
    @Response: 
      Em caso de sucesso: {
        status: 'Sucess',
      }, 
      Em caso de erro: só segue o fluxo deixando para o controller retornar o erro
    
  ****************************************************************
  Fluxo de Trabalho:

  1 - Verificar se a ação é de deleção por farm_id ou user_id
  2- Conectar com repository de acordo com o tipo de deleção acima
  3- Retornar o status da deleção

*/

interface IDeleteFarmService {
  delFarm({
    user_id,
    farm_id,
  }: IDeleteFarmService.Params): IDeleteFarmService.Response;
}

namespace IDeleteFarmService {
  export type Params = { user_id?: string; farm_id?: string };
  export type Response = Promise<{
    status: string;
    error?: string;
  }>;
}

export { IDeleteFarmService };
