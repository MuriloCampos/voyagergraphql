import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { UserInfoProvider } from './user';

const AppProvider = ({ children }) => {
  return (
    <UserInfoProvider>
      <NavigationContainer>{children}</NavigationContainer>
    </UserInfoProvider>
  );
};

export default AppProvider;
