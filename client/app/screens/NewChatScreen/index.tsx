import React, {useEffect, useState} from "react";
import {Text, View} from "react-native";
import {ScrollView} from "react-native-gesture-handler";
import Axios, {AxiosResponse, AxiosError} from "axios";

import {NewChatBanner} from "../../components/NewChatBanner";
import {PersonCard} from "../../components/PersonCard";
import {AppNavProps} from "../../configs/paramLists";
import styles from "./styles";
import {AuthContext} from "../../providers/AuthProvider";

const friendIcon = require("../../assets/new_friend.png");
const groupIcon = require("../../assets/new_group.png");
const profilePic = require("../../assets/icon.png");

type friendInfo = {_id: string; username: string};

interface Props {}
export const NewChatScreen = ({navigation, route}: AppNavProps<"NewChat">) => {
  const [friendList, setFriendList] = useState<friendInfo[]>([]);
  console.log("..", friendList);

  useEffect(() => {
    Axios.get("/friendlist/getallfriend")
      .then((res: AxiosResponse) => {
        setFriendList(res.data);
      })
      .catch((err: AxiosError) => console.log(err.response?.data));
  }, []);
  const handleChat = (name: string, picture: any) => {
    const existedChat = route.params.existingChats.filter(
      chat => chat.name == name
    );
    if (existedChat[0]) {
      navigation.navigate("Chat", {
        _id: existedChat[0]._id,
        name: [name],
        picture: existedChat[0].picture,
      });
      return;
    }
    navigation.navigate("Chat", {
      _id: null,
      name: [name],
      picture,
    });
  };
  const newFriendChat = () => {
    Axios.post("/chat/getNewFriend", {friendList}).then((res: AxiosResponse) =>
      handleChat(res.data[0].username, profilePic)
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.banners}>
        <NewChatBanner
          onPress={newFriendChat}
          text="Let's Find A New Friend!"
          image={friendIcon}
        />
        {/* <NewChatBanner
          onPress={() => {}}
          text="Create A New Group."
          image={groupIcon}
        /> */}
      </View>
      <ScrollView>
        {friendList && friendList.length > 0 ? (
          friendList.map(info => {
            return (
              <PersonCard
                key={info._id}
                onPress={() => handleChat(info.username, profilePic)}
                picture={profilePic}
                name={info.username}
              />
            );
          })
        ) : (
          <View style={{alignItems: "center", paddingTop: 25}}>
            <Text style={styles.text}>
              You have no friend :( Let's Make Some!
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};
