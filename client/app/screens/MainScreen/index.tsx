import React, {useEffect, useState, useContext} from "react";
import {View, Image, TouchableOpacity} from "react-native";
import {ScrollView} from "react-native-gesture-handler";

import {MessageBar} from "../../components/MessageBar";
import {AppNavProps} from "../../configs/paramLists";
import {SocketContext} from "../../providers/SocketProvider";
import {AuthContext} from "../../providers/AuthProvider";

import pic from "../../assets/icon.png";
import styles from "./styles";

type Message = {
  _id: string;
  name: string;
  timeStamp: "12:12";
  message: "asdsdasd";
  picture: any;
};
interface Props {}

export const MainScreen = ({navigation}: AppNavProps<"Main">) => {
  const socket = useContext(SocketContext);
  const {user} = useContext(AuthContext);
  const [messages, setMessages] = useState<Message[]>([]);
  useEffect(() => {
    socket.emit("get-rooms", {user_id: user?._id}, (res: any[]) => {
      console.log(res);
      const x: Message[] = res.map((room: any) => {
        return {
          name: room.name,
          timeStamp: "12:12",
          message: "asdsdasd",
          _id: room._id,
          picture: pic,
        };
      });
      setMessages(x);
    });
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView style={styles.messages}>
        {messages.map(message => {
          return (
            <MessageBar
              key={message._id}
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
