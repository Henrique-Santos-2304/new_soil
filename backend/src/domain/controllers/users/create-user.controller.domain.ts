/* Criação de novo Usuario no banco de dados

  *****************************************************************
    @Params: {
      login: string, 
      password: string, 
      userType: SUDO ou USER
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
        SUDO: Acesso Total ao app, 
        USER: Acesso Moderado as sua respectiva fazendas 
    */

import { CreateUserDto } from '@root/domain';

interface ICreateUserController {
  createUser(
    user: ICreateUserController.Params,
  ): ICreateUserController.Response;
}

namespace ICreateUserController {
  export type Params = CreateUserDto;
  export type Response = Promise<{ status: string; error?: string }>;
}

export { ICreateUserController };
