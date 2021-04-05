import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {useState} from "react";

type User = null | {_id: string};

export const AuthContext = React.createContext<{
  user: User;
  login: (_id: string) => void;
  logout: () => void;
}>({
  user: null,
  login: () => {},
  logout: () => {},
});

interface Props {}

const AuthProvider: React.FC<Props> = ({children}) => {
  const [user, setUser] = useState<User>(null);
  return (
    <AuthContext.Provider
      value={{
        user,
        login: (_id: string) => {
          const user = {_id};
          setUser(user);
          AsyncStorage.setItem("user", JSON.stringify(user));
        },
        logout: () => {
          setUser(null);
          AsyncStorage.removeItem("user");
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
