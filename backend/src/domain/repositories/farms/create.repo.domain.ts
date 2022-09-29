import { CreateFarmDTO, FarmModel } from '@root/domain/models';

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

interface ICreateFarmRepo {
  create(farm: ICreateFarmRepo.Params): ICreateFarmRepo.Response;
}

namespace ICreateFarmRepo {
  export type Params = CreateFarmDTO;
  export type Response = Promise<{ farm_id: FarmModel['farm_id'] }>;
}

export { ICreateFarmRepo };
