import React, {useContext, useEffect, useState} from "react";
import {NavigationContainer} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ActivityIndicator, View} from "react-native";
import Axios from "axios";

import {AuthContext} from "../providers/AuthProvider";
import styles from "../configs/styles";
import {MainRoute} from "./AppStack";
import {AuthRoute} from "./AuthStack";
import {DATABASE, USER} from "../configs/constants";

interface Props {}

export const Routes = (props: Props) => {
  const {user, login} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  Axios.defaults.headers.common[USER.USER_ID] = user?._id;
  Axios.defaults.baseURL = DATABASE.BASE_URL;

  useEffect(() => {
    AsyncStorage.getItem("user")
      .then(userString => {
        if (userString) login;
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      //@ts-ignore
      <View style={styles.container}>
        <ActivityIndicator size="large" color={styles.colors.tritary} />
      </View>
    );
  return (
    <NavigationContainer>
      {user ? <MainRoute /> : <AuthRoute />}
    </NavigationContainer>
  );
};
