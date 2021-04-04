import React from "react";
import {Text, TouchableOpacity, View} from "react-native";

import styles from "./styles";

interface Props {
  title: string;
  onPress: () => void;
  isBorderButton?: boolean;
}

const _Button = ({title, onPress, isBorderButton}: Props) => {
  return (
    <TouchableOpacity
      style={isBorderButton ? styles.buttonOnlyBorder : styles.button}
      onPress={onPress}
    >
      <Text style={isBorderButton ? styles.textWithBorder : styles.text}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default _Button;
