import React from "react";
import {createStackNavigator} from "@react-navigation/stack";

import colors from "../configs/colors";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import {AuthParamList} from "../configs/paramLists";

interface Props {}

const Stack = createStackNavigator<AuthParamList>();

export const AuthRoute = (props: Props) => {
  return (
    <Stack.Navigator
      screenOptions={{headerStyle: {backgroundColor: colors.primary}}}
      initialRouteName="Welcome"
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen
        name="Welcome"
        options={{header: () => null}}
        component={WelcomeScreen}
      />
    </Stack.Navigator>
  );
};
