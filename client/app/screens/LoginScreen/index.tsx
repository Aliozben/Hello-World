import {AuthNavProps} from "../../configs/paramLists";
import React, {useContext} from "react";
import {View, Text, Image} from "react-native";

import _Button from "../../components/_Button";
import _TextInput from "../../components/_TextInput";

import styles from "./styles";
import {AuthContext} from "../../providers/AuthProvider";

interface Props {}

const LoginScreen = ({navigation, route}: AuthNavProps<"Register">) => {
  const {login} = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/touching_phones.png")}
      />
      <View>
        <_TextInput placeholder="E-mail" icon="email" />
        <_TextInput placeholder="Password" icon="shield-key" secureTextEntry />
      </View>
      <_Button title="SIGN IN" onPress={login} />
    </View>
  );
};

export default LoginScreen;
