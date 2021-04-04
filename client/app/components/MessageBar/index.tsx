import React from "react";
import {Image, ImageSourcePropType, Text, View} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";

import styles from "./styles";

interface Props {
  name: string;
  message: string;
  timeStamp: string;
  picture: any;
  onPress: () => void;
}

export const MessageBar: React.FC<Props> = ({
  name,
  message,
  timeStamp,
  picture,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.textContainer}>
        <View style={styles.upperContainer}>
          <Text style={styles.userName}>{name}</Text>
          <Text style={styles.timeStamp}>{timeStamp}</Text>
        </View>
        <Text style={styles.text}>{message}</Text>
      </View>
      <Image source={picture} style={styles.picture} />
    </TouchableOpacity>
  );
};
