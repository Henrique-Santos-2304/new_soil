/* Criação de novo Usuario no banco de dados

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
      admins_id: string[];
      dealer_id?: string;
      user_id?: string[];
    }
    
  *****************************************************************
    @Response: 
      Em caso de sucesso: {
        status: 'Sucess'
        farm_id: string
      }, 
      Em caso de erro: {
        status: 'Fail',
         error: string
        }, 
      Em caso de erro do Graphql: {
        errors: Array<{message: string}>
      }

  ******************************************************************
  */

import { CreateFarmDTO, ResponseWithoutData } from '@contracts/index';

interface ICreateFarmController {
  createFarm(
    farm: ICreateFarmController.Params,
  ): ICreateFarmController.Response;
}

namespace ICreateFarmController {
  export type Params = CreateFarmDTO;
  export type Response = Promise<
    ResponseWithoutData & {
      farm_id?: string;
    }
  >;
}

export { ICreateFarmController };
