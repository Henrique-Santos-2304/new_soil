import { gql } from 'apollo-server-express';

export const mutationCreateUser = gql`
  mutation CREATE_USER($user: CreateUserInput!) {
    createUser(data: $user) {
      status
      error
    }
  }
`;

export const mutationAuthUser = gql`
  mutation AUTH_USER($authUser: AuthUserInput!) {
    authUser(data: $authUser) {
      status
      error
      token
    }
  }
`;

export const mutationGetAllUsers = gql`
  query getUsers {
    getUsers {
      status
      error
      users {
        user_id
      }
    }
  }
`;
