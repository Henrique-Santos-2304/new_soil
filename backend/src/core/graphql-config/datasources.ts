import { UserDataSource } from '@root/domain/graphql/users/datasource';

const dataSources = () => ({
  userDS: new UserDataSource(),
});

export { dataSources };
