/* Busca usuarios 

  *****************************************************************
    @Params: {
      all: void
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

import { UserModel } from '@root/domain';

interface IGetUserController {
  getUsers(): IGetAllUserController.Response;
}

namespace IGetAllUserController {
  export type Response = Promise<{
    status: string;
    error?: string;
    users?: Omit<UserModel, 'password'>[];
  }>;
}

export { IGetUserController, IGetAllUserController };
