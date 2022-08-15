import { onError } from '@apollo/client/link/error';
import { ApolloClient, from, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from '@apollo/client/link/context';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      if (message === 'Unauthorized' && localStorage?.getItem('TOKEN')) {
        localStorage.removeItem('TOKEN');
        window.location.replace('/auth');
      }
    });
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

const cache = new InMemoryCache();

const httpLink = createUploadLink({
  uri: process.env.REACT_APP_GRAPHQL_URL
  // credentials: 'include'
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('TOKEN');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token || token !== '' ? `Bearer ${token}` : ''
    }
  };
});

const client = new ApolloClient({
  cache,
  link: from([errorLink, authLink.concat(httpLink)])
});

export default client;
