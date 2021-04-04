import React from "react";
import {createStackNavigator} from "@react-navigation/stack";

import {AppParamList} from "../configs/paramLists";
import {MainScreen} from "../screens/MainScreen";
import colors from "../configs/colors";
import {Image, Text, View} from "react-native";
import styles from "../configs/styles";
import {NewChatScreen} from "../screens/NewChatScreen";
import {ChatScreen} from "../screens/ChatScreen";

const Stack = createStackNavigator<AppParamList>();

const ActionBar = () => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 40,
      }}
    >
      <Text
        style={{
          marginLeft: 10,
          fontSize: 20,
          fontFamily: styles.fontFamily,
          color: styles.colors.primary,
        }}
      >
        Hello
      </Text>

      <Image
        source={require("../assets/Logo.png")}
        style={{width: 75, height: 75, marginLeft: 15}}
      />
      <Text
        style={{
          marginLeft: 10,
          fontSize: 20,
          fontFamily: styles.fontFamily,
          color: styles.colors.primary,
        }}
      >
        World!
      </Text>
    </View>
  );
};
interface Props {}
export const MainRoute = (props: Props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: colors.tritary},
        headerTintColor: colors.primary,
      }}
      initialRouteName="Main"
    >
      <Stack.Screen
        name="Main"
        options={{
          //@ts-ignore
          headerTitle: props => <ActionBar {...props} />,
          headerStatusBarHeight: 60,
        }}
        component={MainScreen}
      />
      <Stack.Screen name="NewChat" component={NewChatScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
};
