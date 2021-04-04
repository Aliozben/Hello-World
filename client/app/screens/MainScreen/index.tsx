import React, {useState} from "react";
import {View, Text, Image, TouchableOpacity} from "react-native";
import {ScrollView} from "react-native-gesture-handler";

import {MessageBar} from "../../components/MessageBar";
import {AppNavProps} from "../../configs/paramLists";

import pic from "../../assets/icon.png";
import styles from "./styles";

interface Props {}

export const MainScreen = ({navigation}: AppNavProps<"Main">) => {
  const [messages, setMessages] = useState([
    {
      name: "user name",
      timeStamp: "11:32",
      message: "after that i dont know",
      picture: pic,
    },
    {
      name: "user name2",
      timeStamp: "11:32",
      message: "after that i dont know",
      picture: pic,
    },
  ]);
  return (
    <View style={styles.container}>
      <ScrollView style={styles.messages}>
        {messages.map(message => {
          return (
            <MessageBar
              key={message.name}
              name={message.name}
              timeStamp={message.timeStamp}
              message={message.message}
              picture={message.picture}
              onPress={() =>
                navigation.navigate("Chat", {
                  name: message.name,
                  picture: message.picture,
                })
              }
            />
          );
        })}
      </ScrollView>
      <View style={styles.newChatButton}>
        <TouchableOpacity onPress={() => navigation.navigate("NewChat")}>
          <Image
            style={styles.chatImage}
            source={require("../../assets/new_chat.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
