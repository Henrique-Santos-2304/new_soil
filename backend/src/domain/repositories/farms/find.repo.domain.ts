import { FarmModel } from '@root/domain/models';

/*
  Repositório para acesso ao banco de dados, com a função de buscar um usuario no banco de dados

  ****************************************************************************

  @Params: 
      by_user = { user_id }
      by_id = { farm_id }
      all = void
      
    
  *****************************************************************
    @Response: 
      Em caso de erro retornar = new Error("QUERY ERROR")
      Em caso de achar o fazenda = {
        by_user: retorna todos as fazendas atreladas a esse usuario
        by_id: retorna a fazenda especifica de acordo com id passado
        all: retorna todas as fazendas contidas no banco de dados
      }
  ******************************************************************

*/
interface IFindFarmsRepo {
  by_user({ user_id }: IFindFarmsByUser.Params): IFindFarmsByUser.Response;
  by_id({ farm_id }: IFindFarmById.Params): IFindFarmById.Response;
  all(): IGetAllFarms.Response;
}

namespace IFindFarmsByUser {
  export type Params = { user_id: string };
  export type Response = Promise<FarmModel[]>;
}

namespace IFindFarmById {
  export type Params = { farm_id: FarmModel['farm_id'] };
  export type Response = Promise<FarmModel | undefined>;
}

namespace IGetAllFarms {
  export type Response = Promise<FarmModel[]>;
}

export { IFindFarmsRepo, IFindFarmsByUser, IFindFarmById, IGetAllFarms };
