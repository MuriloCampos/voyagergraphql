import styled, { css } from 'styled-components/native';
import { lighten } from 'polished';

export const Container = styled.SafeAreaView`
  flex: 1;
  padding-top: 30px;
  padding-left: 10px;
  padding-right: 10px;
  background-color: #333333;
`;

export const UserAvatar = styled.Image`
  width: 150px;
  height: 150px;
  border-radius: 75px;

  margin-bottom: 15px;
`;

export const UserBio = styled.Text`
  font-size: 18px;
  text-align: center;
  color: #c4c4c4;

  margin-bottom: 5px;
`;

export const RepoCard = styled.View`
  flex-direction: row;
  margin-top: 25px;
  align-items: center;
  background-color: ${lighten(0.08, '#333333')};
  padding: 10px;
  border-radius: 20px;
`;

export const RepoOwnerAvatar = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 35px;
`;

export const RepoName = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #fafafa;
  margin-bottom: 5px;
`;

export const RepoPrimaryLanguage = styled.Text`
  font-size: 13px;
  color: #fff;
  font-weight: bold;
  background-color: #38eb5f;
  ${props =>
    props.isEmpty &&
    css`
      background-color: transparent;
    `}
  padding: 2px 5px;
  border-radius: 3px;
`;
