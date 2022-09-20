import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { formatError, context, dataSources, cors } from '../graphql-config';

const graphqlModule = GraphQLModule.forRootAsync<ApolloDriverConfig>({
  driver: ApolloDriver,
  useFactory: () => ({
    typePaths: ['./**/*.gql'],
    playground: true,
    formatError,
    context,
    dataSources,
    cors,
  }),
});

export { graphqlModule };
