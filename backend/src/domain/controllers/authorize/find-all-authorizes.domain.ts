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

import { AuthorizeModel } from '@root/domain/models';

interface IGetAuthorizationsController {
  getAuthorizations(): IGetAuthorizationsController.Response;
}

namespace IGetAuthorizationsController {
  export type Response = Promise<{
    status: string;
    error?: string;
    authorizations?: AuthorizeModel[];
  }>;
}

export { IGetAuthorizationsController };
