import React from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

import { useUserInfo } from '../../hooks/user';
import {
  Container,
  UserAvatar,
  UserBio,
  RepoCard,
  RepoOwnerAvatar,
  RepoName,
  RepoPrimaryLanguage,
} from './styles';

const StarredRepos = () => {
  const { user } = useUserInfo();
  return (
    <Container>
      <View style={{ alignItems: 'center' }}>
        <UserAvatar
          source={{
            uri: user.avatar,
          }}
        />
        <UserBio>{user.bio}</UserBio>
      </View>

      <View
        style={{
          borderBottomColor: '#c4c4c4',
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      />

      <FlatList
        data={user.starredRepos}
        keyExtractor={item => item.node.id}
        contentContainerStyle={{ paddingBottom: 25 }}
        renderItem={({ item: repo }) => (
          <RepoCard>
            <RepoOwnerAvatar
              source={{
                uri: repo.node.owner.avatarUrl,
              }}
            />
            <View style={{ marginLeft: 15 }}>
              <RepoName>{repo.node.name}</RepoName>

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <FeatherIcon name="star" size={15} color="#e6e3e3" />
                <Text
                  style={{
                    color: '#e6e3e3',
                    fontSize: 15,
                    marginLeft: 5,
                    marginRight: 10,
                  }}
                >
                  {repo.node.stargazers.totalCount}
                </Text>
                <RepoPrimaryLanguage isEmpty={!repo.node.primaryLanguage}>
                  {repo.node.primaryLanguage
                    ? repo.node.primaryLanguage.name
                    : ''}
                </RepoPrimaryLanguage>
              </View>
            </View>
          </RepoCard>
        )}
      />
    </Container>
  );
};

export default StarredRepos;
