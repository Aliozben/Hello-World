import React, {useEffect, useState, useContext} from "react";
import {View, Image, TouchableOpacity} from "react-native";
import {ScrollView} from "react-native-gesture-handler";

import {MessageBar} from "../../components/MessageBar";
import {AppNavProps} from "../../configs/paramLists";
import {SocketContext} from "../../providers/SocketProvider";
import {AuthContext} from "../../providers/AuthProvider";
import {getTime} from "../../utils/utilities";

import pic from "../../assets/icon.png";
import styles from "./styles";

type Message = {
  _id: string;
  name: string;
  timeStamp: string;
  message: string;
  picture: any;
};
interface Props {}

export const MainScreen = ({navigation}: AppNavProps<"Main">) => {
  const socket = useContext(SocketContext);
  const {user} = useContext(AuthContext);
  const [messages, setMessages] = useState<Message[]>([]);
  const testt = () => {
    socket.emit("send-message", {
      user_id: user?._id,
      room: "606f3034e5a1db21ac3c99fc",
      message: "messagegegegege",
      name: "mememe",
      time: Date,
    });
  };

  useEffect(() => {
    socket.emit("get-rooms", {user_id: user?._id}, (res: any[]) => {
      const roomList: Message[] = res.map((room: any) => {
        return {
          name: room.name,
          timeStamp: getTime(room.time),
          message: room.message,
          _id: room._id,
          picture: pic,
        };
      });
      setMessages(roomList);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);
  const sendMessage = () => {
    socket.emit("send-message", {
      room_id: messages[0]._id,
      message: "heeeeeeehh",
      user_id: user?._id,
    });
  };
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
                  _id: message._id,
                })
              }
            />
          );
        })}
      </ScrollView>
      <View style={styles.newChatButton}>
        <TouchableOpacity
          onPress={() => sendMessage() /*navigation.navigate("NewChat")*/}
        >
          <Image
            style={styles.chatImage}
            source={require("../../assets/new_chat.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
