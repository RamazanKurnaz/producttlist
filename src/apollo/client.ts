import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'https://dummyjson.com/graphql', // DummyJSON GraphQL endpoint
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
