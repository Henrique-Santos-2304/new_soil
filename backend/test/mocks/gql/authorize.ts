import { gql } from 'apollo-server-express';

export const queriesFindAuthorization = gql`
  query GET_ALL_AUTHORIZATIONS {
    getAuthorizations {
      status
      error
      authorize {
        authorize_id
        farm_id
        pivot_id
        created_by
      }
    }
  }
`;
