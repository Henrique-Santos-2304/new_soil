import { CreateUserDto } from '@contracts/index';

/*
  Serviço para lógica de fluxo para criação de um novo Usuario

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
      Em caso de erro: só segue o fluxo deixando para o controller retornar o erro
    
  ****************************************************************
  Fluxo de Trabalho:

  1 - Conectar com IFindUserRepo e verificar se o usuario a ser criado,
      já existe na tabela de users, evitando duplicatas.
      
      1 - Se  já existir levanta erro "User Already Exists"
      2 - Se não existir segue o fluxo para criação

  2 - Conectar com IEncrypterData gerando uma Hash da Senha do Usuario,
      protejendo o dado mais sensível do usuario
      
  3 - Conecta com ICreateUserRepo com a função de salvar o novo usuario
      no banco de dados com a senha criptografada

  4 - Retorna uma das opções mostradas acima no @Response de acordo 
      com o resultado do fluxo de serviço
*/

interface ICreateUserService {
  start(user: ICreateUserService.Params): ICreateUserService.Response;
}

namespace ICreateUserService {
  export type Params = CreateUserDto;
  export type Response = Promise<{ status: 'Sucess' }>;
}

export { ICreateUserService };
