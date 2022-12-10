import {
  CreateFarmDTO,
  CreateUserDto,
  FarmModel,
  UserModel,
} from '@contracts/index';

/*
  Serviço para lógica de fluxo para criação de um novo Fazenda

   *****************************************************************
    @Params: {
      farm_id: string;
      user_id: string;
      userType: string
      add_user_id: string;
    }
    
  *****************************************************************
    @Response: 
      Em caso de sucesso: {
        status: 'Sucess'
      }, 
      Em caso de erro: só segue o fluxo deixando para o controller retornar o erro
    
  ****************************************************************
  Fluxo de Trabalho:

  1 - Conectar com IFindFarmRepo e verificar se a fazenda existe,
      
      1 - Se não existir levanta erro "Farm Does not found"
      2 - Se Existir segue o fluxo 

  2 - Verificar se Usuario tem autorização para adicionar novo usuario
      1 - Se for Master, Revendedor ou Admin libera a adição de usuario
      3 - Se não retornar Unauthorized

  3- Verificar se esse usuario já está na fazenda
      - se estiver exclui da role antiga e adiciona na nova
      - se não estiver adiciona
*/

interface IAddUserIntoFarmService {
  start({
    farm_id,
    auth,
    data,
  }: IAddUserIntoFarmService.Params): IAddUserIntoFarmService.Response;
}

namespace IAddUserIntoFarmService {
  export type Adduser = {
    admins?: FarmModel['admins'];
    users?: FarmModel['users'];
    dealers?: FarmModel['dealers'];
  };

  export type TableAddUser = 'users' | 'admins' | 'dealers';
  export type Params = {
    auth: {
      user_id: string;
      userType: UserModel['userType'];
    };
    farm_id: CreateFarmDTO['farm_id'];
    data: {
      add_user: CreateUserDto;
      table: IAddUserIntoFarmService.TableAddUser;
    };
  };

  export type Response = Promise<{ farm_id: string; user_id: string }>;
}

export { IAddUserIntoFarmService };
