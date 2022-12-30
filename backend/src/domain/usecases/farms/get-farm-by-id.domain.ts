import { FarmModel } from '@contracts/index';

/*
  Serviço para lógica de fluxo para criação de um novo Usuario

   *****************************************************************
    @Params: {
      farm_id: string
    }
    
  *****************************************************************
    @Response: 
      Em caso de sucesso: {
        status: 'Sucess',
        farm: UserModel
      }, 
      Em caso de erro: só segue o fluxo deixando para o controller retornar o erro
    
  ****************************************************************
  Fluxo de Trabalho:

  1 - Conectar com IFindFarmRepo e buscar o usuario
      1 - Retornar a fazenda caso encontrado 
      2 - Retornar erro Farm Not Found

*/

interface IGetFarmByIdService {
  start({ farm_id }: IGetFarmByIdService.Params): IGetFarmByIdService.Response;
}

namespace IGetFarmByIdService {
  export type Params = { farm_id: string };

  export type Response = Promise<FarmModel>;
}

export { IGetFarmByIdService };
