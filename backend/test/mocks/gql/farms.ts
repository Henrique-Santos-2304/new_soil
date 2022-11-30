import { gql } from 'apollo-server-express';

export const mutationCreateFarm = gql`
  mutation CREATE_FARM($createFarm: CreateFarmInput!) {
    createFarm(data: $createFarm) {
      status
      error
      farm_id
    }
  }
`;

export const mutationUpdateFarm = gql`
  mutation PUT_FARM($putFarm: RequestUpdateFarmInput!) {
    putFarm(data: $putFarm) {
      status
      error
      farm_id
    }
  }
`;

export const queryFindFarmsByUser = gql`
  query GET_ALL_FARMS($dataId: GetFarmsByUserInput!) {
    getFarmByUser(data: $dataId) {
      status
      error
      farms {
        farm_id
        farm_name
        farm_city
        farm_lat
        farm_lng
        owner_id
        created_by
        admins
        dealers
        updated_by
        users
      }
    }
  }
`;

export const mutationDelFarm = gql`
  mutation DEL_FARM($data: DeleteFarmsInput!) {
    delFarm(data: $data) {
      status
      error
    }
  }
`;
