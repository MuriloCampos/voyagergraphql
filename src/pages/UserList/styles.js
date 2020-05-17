import styled, { css } from 'styled-components/native';
import { TextInput, Button } from 'react-native-paper';
import { lighten } from 'polished';

export const Container = styled.SafeAreaView`
  flex: 1;
  padding-top: 30px;
  padding-left: 10px;
  padding-right: 10px;
  background-color: #333333;
`;

export const TextInputStyled = styled.TextInput`
  margin-bottom: 15px;
  background-color: ${lighten(0.08, '#333333')};
  color: #fff;
  padding-left: 16px;
  border: 2px;
  border-color: #333333;
  border-radius: 10px;
  ${props =>
    props.isFocused &&
    css`
      border-color: #ff9000;
    `}
`;

export const UserCard = styled.TouchableOpacity`
  flex-direction: row;
  margin-top: 25px;
  align-items: center;
  background-color: ${lighten(0.08, '#333333')};
  padding: 10px;
  border-radius: 20px;
`;

export const UserAvatar = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
`;

export const UserName = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #fafafa;
  margin-bottom: 5px;
`;

export const UserBio = styled.Text`
  flex: 1;
  font-size: 15px;
  color: #e6e3e3;
  flex-wrap: wrap;
`;
