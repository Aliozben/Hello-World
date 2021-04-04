import React from "react";
import {Image, Text, View} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";

import styles from "./styles";

interface Props {
  image: any;
  text: string;
  onPress: () => void;
}

export const NewChatBanner: React.FC<Props> = ({image, text, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.iconContainer}>
        <Image style={styles.image} source={image} />
      </View>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};
