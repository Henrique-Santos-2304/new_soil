import { AuthUserDto } from '@contracts/index';

/*
  Serviço para lógica de fluxo para Autenticação de Usuario

   *****************************************************************
    @Params: {
      login: string, 
      password: string, 
    }
    
  *****************************************************************
    @Response: 
      Em caso de sucesso: {
        status: 'Sucess',
        token: string
      }, 
      Em caso de erro: só segue o fluxo deixando para o controller retornar o erro
    
  ****************************************************************
  Fluxo de Trabalho:

  1 - Conectar com IFindUserRepo.by_login e verificar se o usuario
      existe na tabela de users
      
      1 - Se  não existir levanta erro "Invalid Credentials"
      2 - Se existir segue o fluxo para login

  2 - Conectar com IEncrypterData.compare para checar se a senha recebida bate
      com a criptofragada do banco de dados

      1 - Se as senhas não conferirem levanta erro "Invalid Credentials"
      2 - Se as senhas conferirem segue o fluxo para login
      
  3 - Conecta com IJwtData.create com a função criar um token de autenticação 
      com os dados { user_id, userType, password } do usuario
      

  4 - Se todas as conexões acima der sucesso sem erros, retorna os dados
      Mostrados acima em @Response
*/

interface IAuthUserService {
  start(auth: IAuthUserService.Params): IAuthUserService.Response;
}

namespace IAuthUserService {
  export type Params = AuthUserDto;
  export type Response = Promise<{ status: string; token: string }>;
}

export { IAuthUserService };
