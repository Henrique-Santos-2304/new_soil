import { gql } from 'apollo-server-express';
import request from 'supertest-graphql';

const getTokenMocked = async (app: any) => {
  await request(app.getHttpServer()).mutate(gql`
    mutation CREATE_USER {
      createUser(
        data: {
          login: "soil_test"
          password: "password"
          userType: SUDO
          internal_password: "@Inatel123"
        }
      ) {
        status
        error
      }
    }
  `);

  const { data }: any = await request(app.getHttpServer()).mutate(gql`
    mutation CREATE_USER {
      authUser(data: { login: "soil_test", password: "password" }) {
        status
        error
        token
      }
    }
  `);

  return data.authUser.token;
};

export { getTokenMocked };
