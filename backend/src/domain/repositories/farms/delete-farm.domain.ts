import { FarmModel, UserType } from '@root/domain/models';

/*
  Repositório para deletar fazendas

  ****************************************************************************

  @Params: 
  by_id: {farm_id: string}
  by_user: {user_id: string}
      
    
  *****************************************************************
    @Response: 
      Em caso de erro retornar = new Error("QUERY ERROR")
      Em caso de sucesso: void
  ******************************************************************

*/
interface IDeleteFarmRepo {
  by_user({ user_id }: IDeleteFarmByUser.Params): IDeleteFarmByUser.Response;
  by_id({ farm_id }: IDeleteFarmByIdRepo.Params): IDeleteFarmByIdRepo.Response;
}

namespace IDeleteFarmByUser {
  export type Params = { user_id: string };
  export type Response = Promise<void>;
}

namespace IDeleteFarmByIdRepo {
  export type Params = { farm_id: FarmModel['farm_id'] };
  export type Response = Promise<void>;
}

export { IDeleteFarmRepo, IDeleteFarmByIdRepo, IDeleteFarmByUser };
