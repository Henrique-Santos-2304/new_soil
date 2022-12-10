import {
  CreateFarmDTO,
  CreateUserDto,
  FarmModel,
  ResponseWithoutData,
  UpdateFarmDTO,
  UserModel,
} from '@contracts/index';
import { UserRequestAuth } from '@root/domain/utils/user-request';

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
        status: 'Sucess',
        farm_id: string;
        user_id: string;
      }, 
      Em caso de erro: {
        status: 'Fail',
        error: String

      }
    
  ****************************************************************
  Fluxo de Trabalho:

  Sucess : Conectar com Use Case e retornar o que ele trouxer seguido de status code,
  Error: Retornar a mensagem de erro amigável para o usuario
  
*/

interface IAddUserIntoFarmController {
  addUserIntoFarm(
    data: IAddUserIntoFarmController.Params,
  ): IAddUserIntoFarmController.Response;
}

namespace IAddUserIntoFarmController {
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
      table: IAddUserIntoFarmController.TableAddUser;
    };
  };

  export type Response = Promise<
    ResponseWithoutData & { farm_id?: string; user_id?: string }
  >;
}

export { IAddUserIntoFarmController };
