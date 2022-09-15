import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLError, GraphQLFormattedError } from 'graphql';

const graphqlModule = GraphQLModule.forRoot<ApolloDriverConfig>({
  driver: ApolloDriver,
  typePaths: ['./**/*.gql'],
  formatError: (error: GraphQLError) => {
    const graphQLFormattedError: GraphQLFormattedError = {
      message: error?.extensions?.exception?.code || error?.message,
    };
    return graphQLFormattedError;
  },
  context: ({ req }) => ({ req }),
});

export { graphqlModule };
