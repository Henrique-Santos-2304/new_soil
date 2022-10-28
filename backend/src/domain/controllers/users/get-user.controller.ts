/* Busca usuarios 

  *****************************************************************
    @Params: {
      getUsers: void
    }
    
  *****************************************************************
    @Response: 
      Em caso de sucesso: {
        status: 'Sucess',
        users: UserModel[]
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

import { ResponseWithoutData, UserModel } from '@contracts/index';

interface IGetUserController {
  getUsers(): IGetAllUserController.Response;
}

namespace IGetAllUserController {
  export type Response = Promise<
    ResponseWithoutData & {
      users?: Omit<UserModel, 'password'>[];
    }
  >;
}

export { IGetUserController, IGetAllUserController };
