import React, {useContext, useEffect} from "react";
import {View} from "react-native";
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

interface Props {}

export const NewChatScreen = ({navigation}: AppNavProps<"NewChat">) => {
  const {user} = useContext(AuthContext);

  useEffect(() => {
    Axios.get("/friendlist/getallfriend")
      .then((res: AxiosResponse) => {
        console.log(res.data);
      })
      .catch((err: AxiosError) => console.log(err.response?.data));
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.banners}>
        <NewChatBanner
          onPress={() => {}}
          text="Let's Find A New Friend!"
          image={friendIcon}
        />
        <NewChatBanner
          onPress={() => {}}
          text="Create A New Group."
          image={groupIcon}
        />
      </View>
      <ScrollView>
        <PersonCard
          onPress={() =>
            navigation.navigate("Chat", {name: "Username", picture: profilePic})
          }
          picture={profilePic}
          name="User name 1"
        />
      </ScrollView>
    </View>
  );
};
