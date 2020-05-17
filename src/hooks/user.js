import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

const UserInfoContext = createContext();

const UserInfoProvider = ({ children }) => {
  const [userList, setUserList] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    async function loadUsers() {
      const storagedUsers = await AsyncStorage.getItem('@Voyager:users');

      if (storagedUsers) {
        setUserList(JSON.parse(storagedUsers));
      }
    }

    loadUsers();
  }, []);

  const addUser = useCallback(
    async newUser => {
      const newUserList = [...userList, newUser];
      setUserList(newUserList);
      await AsyncStorage.setItem('@Voyager:users', JSON.stringify(newUserList));
    },
    [userList],
  );

  const selectUser = useCallback(selectedUser => {
    setUser(selectedUser);
  }, []);

  const value = React.useMemo(() => ({ addUser, selectUser, userList, user }), [
    userList,
    user,
    addUser,
    selectUser,
  ]);

  return (
    <UserInfoContext.Provider value={value}>
      {children}
    </UserInfoContext.Provider>
  );
};

function useUserInfo() {
  const context = useContext(UserInfoContext);

  if (!context) {
    throw new Error(`useUserInfo must be used within a UserInfoProvider`);
  }

  return context;
}

export { UserInfoProvider, useUserInfo };
