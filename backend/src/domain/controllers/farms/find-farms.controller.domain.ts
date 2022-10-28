/* Busca fazendas de usuario 

  *****************************************************************
    @Params: {
      getFarmByUser({user_id: string}): void
    }
    
  *****************************************************************
    @Response: 
      Em caso de sucesso: {
        status: 'Sucess',
        users: FarmModel[]
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

import { FarmModel, ResponseWithoutData } from '@contracts/index';

interface IGetFarmsController {
  getFarmByUser({
    user_id,
  }: IGetFarmsController.Params): IGetFarmsController.Response;
}

namespace IGetFarmsController {
  export type Params = { user_id: string };
  export type Response = Promise<
    ResponseWithoutData & {
      farms?: FarmModel[];
    }
  >;
}

export { IGetFarmsController };
