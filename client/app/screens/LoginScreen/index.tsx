import React, {useContext, useState} from "react";
import {View, Text, Image, Button} from "react-native";
import Axios, {AxiosResponse, AxiosError} from "axios";

import {AuthNavProps} from "../../configs/paramLists";
import _Button from "../../components/_Button";
import _TextInput from "../../components/_TextInput";
import styles from "./styles";
import {AuthContext} from "../../providers/AuthProvider";
import Toast from "../../components/Toast";
import {ToastContext} from "../../providers/ToastProvider";
import {ERROR} from "../../configs/constants";

interface Props {}

const LoginScreen = ({navigation, route}: AuthNavProps<"Register">) => {
  const {login} = useContext(AuthContext);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const {addToast} = useContext(ToastContext);
  const handleLogin = () => {
    if (email == "" || password == "") {
      addToast(ERROR.FILL_FIELDS);
      return;
    }
    Axios.post("/user/login", {
      email,
      password,
    })
      .then((res: AxiosResponse) => {
        login(res.data._id, res.data.name);
      })
      .catch((err: AxiosError) => {
        addToast(err.response?.data.Message);
      });
  };
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/touching_phones.png")}
      />
      <Toast />
      <View>
        <_TextInput
          placeholder="E-mail"
          icon="email"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <_TextInput
          placeholder="Password"
          icon="shield-key"
          secureTextEntry
          value={password}
          onChangeText={text => setPassword(text)}
        />
      </View>
      <_Button title="SIGN IN" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
