import React, {useState, useContext, useCallback} from "react";
import {View, Image, TouchableOpacity} from "react-native";
import {ScrollView} from "react-native-gesture-handler";
import {useFocusEffect} from "@react-navigation/native";

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
  const {user} = useContext(AuthContext);
  const socket = useContext(SocketContext);
  socket.connect();
  const [messages, setMessages] = useState<Message[]>([]);

  useFocusEffect(
    useCallback(() => {
      if (!socket.connected) socket.connect();
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
    }, [])
  );
  const sendMessage = () => {
    socket.emit("send-message", {
      room_id: messages[0]._id,
      message: "heeeeeeehh",
      user_name: user?.name,
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
                  name: [message.name],
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
          onPress={() =>
            /* sendMessage()*/ navigation.navigate("NewChat", {
              existingChats: messages.map(message => {
                return message;
              }),
            })
          }
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
