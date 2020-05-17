import ApolloClient from 'apollo-boost';

export default new ApolloClient({
  uri: 'https://api.github.com/graphql',
  request: operation => {
    const token = 'YOUR_GITHUB_API_KEY';
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    });
  },
});
