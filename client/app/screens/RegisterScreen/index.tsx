import React, {useState} from "react";
import {View, Image} from "react-native";
import Axios from "axios";

import _Button from "../../components/_Button";
import _TextInput from "../../components/_TextInput";
import styles from "./styles";
interface Props {}

const RegisterScreen = (props: Props) => {
  const [username, setUsername] = useState<string>("usernamee");
  const [email, setEmail] = useState<string>("emaill");
  const [password, setPassword] = useState<string>("pass");

  const handleRegister = async () => {
    await Axios.post("http://192.168.1.25:3001/api/user/register", {
      username,
      email,
      password,
    })
      .then(res => {})
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/drawing.png")}
      />
      <View>
        <_TextInput placeholder="Username" icon="tag-faces" />
        <_TextInput placeholder="E-mail" icon="email" />
        <_TextInput placeholder="Password" icon="shield-key" secureTextEntry />
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
