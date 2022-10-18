import { AuthorizeModel, CreateAuthorizeDto } from '@root/domain/models';

/*
  Repositório para acesso ao banco de dados, com a função de criar novo usuario

  ****************************************************************************

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
      Em caso de erro retornar = new Error("QUERY ERROR")
      Em caso de sucesso = Farm_id da fazenda criada

  ******************************************************************

*/

interface ICreateAuthorizeRepo {
  create(authorize: ICreateAuthorizeRepo.Params): ICreateAuthorizeRepo.Response;
}

namespace ICreateAuthorizeRepo {
  export type Params = CreateAuthorizeDto;
  export type Response = Promise<{
    authorize_id: AuthorizeModel['authorize_id'];
  }>;
}

export { ICreateAuthorizeRepo };
