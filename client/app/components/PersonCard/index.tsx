import React from "react";
import {Image, Text, View} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";

import styles from "./styles";

interface Props {
  picture: any;
  name: string;
  onPress: () => void;
}

export const PersonCard: React.FC<Props> = ({picture, name, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image style={styles.picture} source={picture} />
      <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>
  );
};
