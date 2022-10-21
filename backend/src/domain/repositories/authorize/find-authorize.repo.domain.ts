import { AuthorizeModel, FarmModel } from '@root/domain/models';

/*
  Repositório para acesso ao banco de dados, com a função de buscar um usuario no banco de dados

  ****************************************************************************

  @Params: 
      all = void
      
    
  *****************************************************************
    @Response: 
      Em caso de erro retornar = new Error("QUERY ERROR")
      Em caso de achar o authorizes = {
        all: retorna todas os pedidos de autorização contidas no banco de dados
      }
  ******************************************************************

*/
interface IFindAuthorizeRepo {
  all(): IGetallAuthorize.Response;
  by_farm(farm_id: IGetByFarmAuthorize.Params): IGetByFarmAuthorize.Response;
}

namespace IGetByFarmAuthorize {
  export type Params = string;
  export type Response = Promise<AuthorizeModel>;
}

namespace IGetallAuthorize {
  export type Response = Promise<AuthorizeModel[]>;
}

export { IFindAuthorizeRepo, IGetallAuthorize };
