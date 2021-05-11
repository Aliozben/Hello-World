import React, {useContext, useEffect, useLayoutEffect, useState} from "react";
import {Image, Text, View, UIManager, findNodeHandle} from "react-native";
import {ScrollView, TouchableOpacity} from "react-native-gesture-handler";
import Axios, {AxiosError, AxiosResponse} from "axios";
import ModalDropdown from "react-native-modal-dropdown";

import _TextInput from "../../components/_TextInput";
import {AppNavProps} from "../../configs/paramLists";
import styles from "./styles";
import buttonImage from "../../assets/3dot.png";
import {SocketContext} from "../../providers/SocketProvider";
import {AuthContext} from "../../providers/AuthProvider";
import {getTime} from "../../utils/utilities";
import {ToastContext} from "../../providers/ToastProvider";
import {CHAT} from "../../configs/constants";

interface Props {}
type Message = {
  message: string;
  name: string;
  reicived?: true;
  _id: string;
  timeStamp: string;
};

export const ChatScreen = ({navigation, route}: AppNavProps<"Chat">) => {
  const socket = useContext(SocketContext);
  const {user} = useContext(AuthContext);
  const {addToast} = useContext(ToastContext);
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState<string>("");

  useEffect(() => {
    socket.on("new-message", (res: any) => {
      const newMessage: Message = {
        message: res.message,
        name: res.message_owner_name,
        reicived: true,
        _id: res._id,
        timeStamp: getTime(res.createdAt),
      };
      handleNewMessage(res);
    });
  }, [socket]);

  useEffect(() => {
    if (route.params._id)
      Axios.post("/chat/allMessages", {room_id: route.params._id})
        .then((res: AxiosResponse) => {
          const bubbles: Message[] = res.data.map((item: any) => {
            return {
              message: item.message,
              name: item.message_owner_name,
              reicived: item.reicived,
              _id: item._id,
              timeStamp: getTime(item.createdAt),
            };
          });
          setMessages(bubbles);
        })
        .catch((error: AxiosError) => console.log(error));
  }, []);

  let room_id: string | null = null;
  const sendMessage = async () => {
    if (!room_id && !route.params._id) {
      await Axios.post("/chat/newChat", {
        names: [...route.params.name, user?.name],
      })
        .then((res: AxiosResponse) => {
          room_id = res.data._id;
        })
        .catch((err: AxiosError) => {});
    } else room_id = route.params._id;

    socket.emit("send-message", {
      room_id: room_id,
      message: text,
      user_name: user?.name,
    });
    console.log("send-message emit");
    const message: Message = {
      message: text,
      name: user?.name!,
      _id: messages.length > 0 ? messages[messages.length - 1]._id + "1" : "1",
      timeStamp: getTime(Date()),
    };
    setText("");
    handleNewMessage(message);
  };
  const handleNewMessage = (newMessage: Message) => {
    setMessages(oldMessages => [...oldMessages, newMessage]);
  };
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
          <ModalDropdown
            options={["Add to Friend List"]}
            onSelect={index => dropDownFunc(parseInt(index))}
            dropdownStyle={styles.dropdownStyle}
            dropdownTextStyle={styles.dropdownTextStyle}
          >
            <Image source={buttonImage} style={{width: 40, height: 75}} />
          </ModalDropdown>
        );
      },
    });
  }, []);
  const dropDownFunc = (index: number) => {
    switch (index) {
      case 0:
        addFriend();
        break;
      default:
        break;
    }
  };
  const addFriend = async () => {
    Axios.post("/friendlist/addFriend", {names: route.params.name})
      .then((res: AxiosResponse) => {
        const {data} = res;
        addToast(CHAT.ADDED_NEW_FRIEND + route.params.name[0]);
      })
      .catch((err: AxiosError) => {
        addToast(err.response?.data.message);
      });
  };
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
            <View key={message._id} style={styles.bubbleReicive}>
              {header && (
                <View style={styles.bubbleHeaderReicive}>
                  <Image
                    source={route.params.picture}
                    style={styles.imageReicived}
                  />
                  <Text style={{marginRight: -15}}>{message.name}</Text>
                </View>
              )}

              <Text style={styles.textReicive}>
                {message.message}
                <Text style={styles.time}> {message.timeStamp}</Text>
              </Text>
            </View>
          ) : (
            <View key={message._id} style={styles.bubbleSent}>
              {header && (
                <View style={styles.bubbleHeaderSent}>
                  <Image
                    source={route.params.picture}
                    style={styles.imageSend}
                  />
                </View>
              )}
              <Text style={styles.textSent}>
                {message.message}
                <Text style={styles.time}> {message.timeStamp}</Text>
              </Text>
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
          <_TextInput
            value={text}
            onChangeText={text => setText(text)}
            placeholder="Type here.."
          />
        </View>
        <TouchableOpacity onPress={sendMessage}>
          <Image
            style={styles.sendImage}
            source={require("../../assets/send.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
