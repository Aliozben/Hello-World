import React from "react";
import {Text} from "react-native";

import styles from "./styles";

interface Props {
  children: React.ReactNode;
}

const _Text = (props: Props) => {
  return <Text style={styles.text}>{props.children}</Text>;
};

export default _Text;
