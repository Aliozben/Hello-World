import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";

export type AuthParamList = {
  Login: undefined;
  Register: undefined;
  Welcome: undefined;
};

export type AuthNavProps<T extends keyof AuthParamList> = {
  navigation: StackNavigationProp<AuthParamList, T>;
  route: RouteProp<AuthParamList, T>;
};

export type AppParamList = {
  Main: undefined;
  NewChat: undefined;
  Chat: {name: string; picture: any; _id: string};
};

export type AppNavProps<T extends keyof AppParamList> = {
  navigation: StackNavigationProp<AppParamList, T>;
  route: RouteProp<AppParamList, T>;
};
