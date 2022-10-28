/* Busca usuarios 

  *****************************************************************
    @Params: {
      all: void
    }
    
  *****************************************************************
    @Response: 
      Em caso de sucesso: {
        status: 'Sucess',
        users: AuthorizeModel[]
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

import { AuthorizeModel, ResponseWithoutData } from '@contracts/index';

interface IGetAuthorizationsController {
  getAuthorizations(): IGetAuthorizationsController.Response;
}

namespace IGetAuthorizationsController {
  export type Response = Promise<
    ResponseWithoutData & {
      authorizations?: AuthorizeModel[];
    }
  >;
}

export { IGetAuthorizationsController };
