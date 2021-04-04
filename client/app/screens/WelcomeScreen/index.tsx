import {AuthNavProps} from "../../configs/paramLists";
import React from "react";
import {View, Text, Image} from "react-native";

import _Button from "../../components/_Button";
import _TextInput from "../../components/_TextInput";

import styles from "./styles";
interface Props {}

const WelcomeScreen = ({navigation, route}: AuthNavProps<"Welcome">) => {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../assets/Logo.png")} />
      <View style={styles.buttonContainer}>
        <_Button
          title="LOGIN"
          onPress={() => navigation.navigate("Login")}
          isBorderButton={true}
        ></_Button>
        <_Button
          title="REGISTER"
          onPress={() => navigation.navigate("Register")}
        ></_Button>
      </View>
    </View>
  );
};

export default WelcomeScreen;
