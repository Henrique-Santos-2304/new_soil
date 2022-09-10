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
  authUser(data: IAuthUserController.Params): IAuthUserController.Response;
}

namespace IAuthUserController {
  export type Params = {
    login: CreateUserDto['login'];
    password: CreateUserDto['password'];
  };

  export type Response = Promise<{
    status: string;
    token?: string;
    error?: string;
  }>;
}

export { IAuthUserController };
