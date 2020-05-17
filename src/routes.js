import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import UserList from './pages/UserList';
import StarredRepos from './pages/StarredRepos';

const Stack = createStackNavigator();

const Routes = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="UserList" component={UserList} />
    <Stack.Screen name="StarredRepos" component={StarredRepos} />
  </Stack.Navigator>
);

export default Routes;
