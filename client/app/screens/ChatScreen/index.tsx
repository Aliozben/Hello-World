import React, {useLayoutEffect, useState} from "react";
import {Image, Text, View} from "react-native";
import {ScrollView, TouchableOpacity} from "react-native-gesture-handler";

import _TextInput from "../../components/_TextInput";
import {AppNavProps} from "../../configs/paramLists";
import styles from "./styles";
import buttonImage from "../../assets/3dot.png";

interface Props {}
type Message = {
  message: string;
  name: string;
  reicived?: true;
  id: number;
};

export const ChatScreen = ({navigation, route}: AppNavProps<"Chat">) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      message: "asdasdfasdfasdf",
      name: "user1",
      reicived: true,
      id: 1,
    },
    {
      message: "asdasdfasdfasdf",
      name: "user1",
      reicived: true,
      id: 2,
    },
    {
      message: "asdasdfasdfasdf",
      name: "user1",
      reicived: true,
      id: 3,
    },
    {
      message: "11111asdasdfasdfasdf asdasdas asdasddasdasd",
      name: "user2",
      id: 4,
    },
    {
      message: "11111asdasdfasdfasdf asdasdas asdasddasdasd",
      name: "user2",
      id: 5,
    },
  ]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => {
        return (
          <View style={{flexDirection: "row", alignItems: "center"}}>
            <Image
              source={route.params.picture}
              style={{width: 40, height: 40, borderRadius: 50}}
            />
            <Text style={styles.headerText}>{route.params.name}</Text>
          </View>
        );
      },
      headerRight: () => {
        return (
          <TouchableOpacity>
            <Image source={buttonImage} style={{width: 40, height: 75}} />
          </TouchableOpacity>
        );
      },
    });
  });

  let lastMessageName: string = "";
  const handleHeader = (name: string) => {
    const isHeaderVisible = lastMessageName != name ? true : false;
    lastMessageName = name;
    return isHeaderVisible;
  };
  return (
    <View style={styles.container}>
      <ScrollView style={styles.chat}>
        {messages.map(message => {
          const header = handleHeader(message.name);
          return message.reicived ? (
            <View key={message.id} style={styles.bubbleReicive}>
              {header && (
                <View style={styles.bubbleHeaderReicive}>
                  <Image source={route.params.picture} style={styles.image} />
                  <Text>{message.name}</Text>
                </View>
              )}

              <Text style={styles.textReicive}>{message.message}</Text>
            </View>
          ) : (
            <View key={message.id} style={styles.bubbleSent}>
              {header && (
                <View style={styles.bubbleHeaderSent}>
                  <Text>{message.name}</Text>
                  <Image source={route.params.picture} style={styles.image} />
                </View>
              )}
              <Text style={styles.textSent}>{message.message}</Text>
            </View>
          );
        })}
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity>
          <Image
            style={styles.imageImage}
            source={require("../../assets/picture.png")}
          />
        </TouchableOpacity>
        <View style={{width: "75%"}}>
          <_TextInput placeholder="Type here.." />
        </View>
        <TouchableOpacity>
          <Image
            style={styles.sendImage}
            source={require("../../assets/send.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
