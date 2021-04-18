import React, {useContext, useState} from "react";
import {View, Image} from "react-native";
import Axios, {AxiosError} from "axios";

import _Button from "../../components/_Button";
import _TextInput from "../../components/_TextInput";
import styles from "./styles";
import Toast from "../../components/Toast";
import {ToastContext} from "../../providers/ToastProvider";
import {ERROR} from "../../configs/constants";
interface Props {}

const RegisterScreen = (props: Props) => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rePassword, setRePassword] = useState<string>("");
  const {addToast} = useContext(ToastContext);

  const handleRegister = async () => {
    if (username == "" || email == "" || password == "" || rePassword == "") {
      addToast(ERROR.FILL_FIELDS);
      return;
    }
    if (password !== rePassword) {
      addToast(ERROR.PASSWORDS_DOESNT_MATCH);
      return;
    }
    await Axios.post("/user/register", {
      username,
      email,
      password,
    })
      .then(res => {
        console.log(res.data);
      })
      .catch((err: AxiosError) => {
        console.log(err.response?.data);
      });
  };

  return (
    <View style={styles.container}>
      <Toast />
      <Image
        style={styles.image}
        source={require("../../assets/drawing.png")}
      />
      <View>
        <_TextInput
          placeholder="Username"
          value={username}
          onChangeText={(text: string) => setUsername(text)}
          icon="tag-faces"
        />
        <_TextInput
          placeholder="E-mail"
          value={email}
          onChangeText={(text: string) => setEmail(text)}
          icon="email"
        />
        <_TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text: string) => setPassword(text)}
          icon="shield-key"
          secureTextEntry
        />
        <_TextInput
          placeholder="Password again :I"
          value={rePassword}
          onChangeText={(text: string) => setRePassword(text)}
          icon="shield-key"
          secureTextEntry
        />
      </View>
      <_Button title="SIGN UP" onPress={handleRegister} />
    </View>
  );
};

export default RegisterScreen;
