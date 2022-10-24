import { FarmModel } from '@contracts/index';

/*
  Serviço para lógica de fluxo buscar todas fazendas de acordo com usuário

   *****************************************************************
    @Params: {user_id:string}
    
  *****************************************************************
    @Response: 
      Em caso de sucesso: {
        status: 'Sucess',
        users: FarmModel[]
      }, 
      Em caso de erro: só segue o fluxo deixando para o controller retornar o erro
    
  ****************************************************************
  Fluxo de Trabalho:

  1 - Conectar com IFindFarm e buscar todas as fazendas no banco de dados de acordo com a autorização do usuario
      1 - Retornar as fazendas ou array vazio 

*/

interface IGetAllFarmsByUserService {
  start({
    user_id,
  }: IGetAllFarmsByUserService.Params): IGetAllFarmsByUserService.Response;
}

namespace IGetAllFarmsByUserService {
  export type Params = { user_id: string };
  export type Response = Promise<FarmModel[]>;
}

export { IGetAllFarmsByUserService };
