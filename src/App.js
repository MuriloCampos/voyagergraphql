import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ApolloProvider } from '@apollo/react-hooks';

import UserInfoContext from './context/UserInfoContext';
import AppContainer from './hooks';
import client from './services/api';

import Routes from './routes';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <StatusBar backgroundColor="#333333" />
      <AppContainer>
        <Routes />
      </AppContainer>
    </ApolloProvider>
  );
};

export default App;
