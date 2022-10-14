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
