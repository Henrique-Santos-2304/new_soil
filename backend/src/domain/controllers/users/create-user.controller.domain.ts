/* Criação de novo Usuario no banco de dados

  *****************************************************************
    @Params: {
      login: string, 
      password: string, 
      userType: MASTER ou USER
    }
    
  *****************************************************************
    @Response: 
      Em caso de sucesso: {
        status: 'Sucess'
      }, 
      Em caso de erro: {
        status: 'Fail',
         error: string
        }, 
      Em caso de erro do Graphql: {
        errors: Array<{message: string}>
      }

  ******************************************************************
      USERTYPE = 
        MASTER: Acesso Total ao app, 
        USER: Acesso Moderado as sua respectiva fazendas 
    */

import { CreateUserDto, ResponseWithoutData } from '@contracts/index';

interface ICreateUserController {
  createUser(
    user: ICreateUserController.Params,
  ): ICreateUserController.Response;
}

namespace ICreateUserController {
  export type Params = CreateUserDto & { internal_password: string };
  export type Response = Promise<ResponseWithoutData>;
}

export { ICreateUserController };
