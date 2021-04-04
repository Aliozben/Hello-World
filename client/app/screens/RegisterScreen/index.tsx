import React, {useState} from "react";
import {View, Image} from "react-native";
import Axios, {AxiosError} from "axios";

import _Button from "../../components/_Button";
import _TextInput from "../../components/_TextInput";
import styles from "./styles";
interface Props {}

const RegisterScreen = (props: Props) => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleRegister = async () => {
    await Axios.post("http://192.168.1.25:3001/api/user/register", {
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
          icon="shield-key"
          secureTextEntry
        />
      </View>
      <_Button title="SIGN UP" onPress={handleRegister} />
    </View>
  );
};

export default RegisterScreen;
