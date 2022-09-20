import { ExecutionContext } from '@nestjs/common';
import { CreateUserDto } from '@root/domain/models';
/* Autenticação de usuario via login
  *****************************************************************
    @Params: {
      login: string, 
      password: string, 
    }
    
  *****************************************************************
    @Response: 
      Em caso de sucesso: {
        status: 'Sucess', token: string
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

interface IAuthUserController {
  authUser(
    ctx: IAuthUserController.Context,
    data: IAuthUserController.Params,
  ): IAuthUserController.Response;
}

namespace IAuthUserController {
  export type Params = Omit<CreateUserDto, 'UserType'>;
  export type Context = ExecutionContext;

  export type Response = Promise<{
    status: string;
    token?: string;
    error?: string;
  }>;
}

export { IAuthUserController };
