import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { Button } from 'react-native-paper';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { gql } from 'apollo-boost';
import { useLazyQuery } from '@apollo/react-hooks';

import { useUserInfo } from '../../hooks/user';

import {
  Container,
  TextInputStyled,
  UserCard,
  UserAvatar,
  UserName,
} from './styles';

const GET_USER = gql`
  query newUser($userLogin: String!) {
    user(login: $userLogin) {
      login
      avatarUrl
      bio
      starredRepositories(first: 10) {
        totalCount
        edges {
          node {
            id
            name
            owner {
              login
              avatarUrl
            }
            stargazers {
              totalCount
            }
            primaryLanguage {
              name
            }
          }
        }
      }
    }
  }
`;

const UserList = ({ navigation }) => {
  const [newUser, setNewUser] = useState('');
  const [users, setUsers] = useState([]);
  const [focused, setFocused] = useState(false);
  const [getNewUser, { loading, data }] = useLazyQuery(GET_USER);
  const { addUser, userList, selectUser } = useUserInfo();

  useEffect(() => {
    setUsers(userList);
  }, [userList]);

  useEffect(() => {
    async function addUserToContext(aNewUser) {
      await addUser(aNewUser);
    }

    if (!loading && data && data.user) {
      const newUserToAdd = {
        name: data.user.login,
        stars: data.user.starredRepositories.totalCount,
        avatar: data.user.avatarUrl,
        bio: data.user.bio,
        starredRepos: data.user.starredRepositories.edges,
      };

      const userExists = userList.find(user => user.name === newUserToAdd.name);

      if (!userExists) {
        addUserToContext(newUserToAdd);
      }
    }
  }, [loading, data]);

  const handleAddNewUser = useCallback(() => {
    getNewUser({
      variables: { userLogin: newUser },
    });

    setNewUser('');
  }, [getNewUser, newUser]);

  const handleSelectUser = useCallback(
    user => {
      selectUser(user);
      navigation.navigate('StarredRepos');
    },
    [selectUser, navigation],
  );

  return (
    <Container>
      <TextInputStyled
        placeholder="Enter github user"
        value={newUser}
        placeholderTextColor="#c4c4c4"
        onChangeText={setNewUser}
        isFocused={focused}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        autoCapitalize="none"
        onSubmitEditing={handleAddNewUser}
        returnKeyType="send"
      />
      <Button
        icon="github-circle"
        mode="contained"
        onPress={handleAddNewUser}
        style={{ marginBottom: 25, backgroundColor: '#ff9000' }}
      >
        Add User
      </Button>

      <View
        style={{
          borderBottomColor: '#c4c4c4',
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      />

      {!users.length ? (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <>
            {loading ? (
              <ActivityIndicator size={100} color="#c4c4c4" />
            ) : (
              <FontAwesome name="github-alt" size={100} color="#c4c4c4" />
            )}
          </>
        </View>
      ) : (
        <FlatList
          data={userList}
          keyExtractor={user => user.name}
          contentContainerStyle={{ paddingBottom: 25 }}
          renderItem={({ item: user }) => (
            <UserCard onPress={() => handleSelectUser(user)}>
              <UserAvatar
                source={{
                  uri: user.avatar,
                }}
              />

              <View style={{ marginLeft: 10 }}>
                <UserName>{user.name}</UserName>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <FeatherIcon name="star" size={20} color="#e6e3e3" />
                  <Text
                    style={{ color: '#e6e3e3', fontSize: 20, marginLeft: 5 }}
                  >
                    {user.stars}
                  </Text>
                </View>
              </View>
            </UserCard>
          )}
        />
      )}
    </Container>
  );
};

export default UserList;
