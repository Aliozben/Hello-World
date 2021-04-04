import React from "react";
import {View, Text, TextInput} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";

import styles from "./styles";
import colors from "../../configs/colors";

interface Props {
  icon?: any;
  placeholder?: string;
  secureTextEntry?: boolean;
}

const _TextInput = ({icon, ...rest}: Props) => {
  return (
    <View style={styles.container}>
      {icon && (
        <MaterialCommunityIcons
          style={styles.icon}
          name={icon}
          size={20}
          color={colors.tritary}
        />
      )}
      <TextInput
        style={styles.textInput}
        placeholderTextColor={colors.tritary}
        {...rest}
      />
    </View>
  );
};

export default _TextInput;
