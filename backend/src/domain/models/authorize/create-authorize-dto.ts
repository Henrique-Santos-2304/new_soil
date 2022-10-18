/*
  Data Object Transfer para criação de novo Authorização de novos dados 

  ***********************************************************************

  farm_id : String = Usado para mostrar a fazenda que o usuario esta tentando criar
  pivot_id: String = Usado para mostrar o pivô que o usuario esta tentando criar
  created_by: O Usuario que está tentando criar um novo dado no banco

  *************************************************************************
*/
class CreateAuthorizeDto {
  farm_id?: string;
  pivot_id?: string;
  created_by: string;
}

export { CreateAuthorizeDto };
