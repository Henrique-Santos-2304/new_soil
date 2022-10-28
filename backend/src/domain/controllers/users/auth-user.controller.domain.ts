import { ExecutionContext } from '@nestjs/common';
import { CreateUserDto, ResponseWithoutData } from '@contracts/index';
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
  export type Params = Omit<CreateUserDto, 'userType'>;
  export type Context = ExecutionContext | any;

  export type Response = Promise<
    ResponseWithoutData & {
      token?: string;
    }
  >;
}

export { IAuthUserController };
