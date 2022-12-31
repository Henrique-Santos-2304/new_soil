import { FarmModel, UserType } from '@root/domain/models';

/*
  Repositório para deletar fazendas

  ****************************************************************************

  @Params: 
  by_id: {user_id: string}
      
    
  *****************************************************************
    @Response: 
      Em caso de erro retornar = new Error("QUERY ERROR")
      Em caso de sucesso: void
  ******************************************************************

*/
interface IDeleteUserRepo {
  by_id({ user_id }: IDeleteUserRepo.Params): IDeleteUserRepo.Response;
}

namespace IDeleteUserRepo {
  export type Params = { user_id: string };
  export type Response = Promise<void>;
}

export { IDeleteUserRepo };
