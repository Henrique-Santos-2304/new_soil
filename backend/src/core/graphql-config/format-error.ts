import { GraphQLError, GraphQLFormattedError } from 'graphql';

const formatError = (error: GraphQLError) => {
  const graphQLFormattedError: GraphQLFormattedError = {
    message: error?.extensions?.exception?.code || error?.message,
  };
  return graphQLFormattedError;
};

export { formatError };
