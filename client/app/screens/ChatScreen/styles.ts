import {StyleSheet} from "react-native";

import cStyles from "../../configs/styles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cStyles.colors.primary,
    alignItems: "center",
  },
  footer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  chat: {flex: 1, width: "100%"},
  bubbleReicive: {
    alignSelf: "flex-start",
    position: "relative",
  },
  textReicive: {
    elevation: 1,
    backgroundColor: cStyles.colors.tritary,
    borderRadius: 20,
    borderTopLeftRadius: 1,
    marginLeft: 15,
    marginVertical: 5,
    maxWidth: "75%",
    padding: 10,
    color: cStyles.colors.primary,
    fontFamily: cStyles.fontFamily,
    fontSize: 18,
  },
  bubbleHeaderReicive: {
    position: "absolute",
    top: -35,
    left: -3,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  bubbleSent: {
    alignSelf: "flex-end",
    position: "relative",
  },
  textSent: {
    elevation: 1,
    color: cStyles.colors.tritary,
    fontFamily: cStyles.fontFamily,
    fontSize: 18,
    padding: 10,
    maxWidth: "75%",
    backgroundColor: cStyles.colors.secondary,
    borderRadius: 20,
    borderTopRightRadius: 1,
    marginRight: 15,
    marginVertical: 5,
  },
  bubbleHeaderSent: {
    position: "absolute",
    top: -35,
    right: -2,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 50,
    margin: 5,
  },
  sendImage: {
    width: 50,
    height: 65,
  },
  imageImage: {
    width: 50,
    height: 50,
  },
  headerText: {
    color: cStyles.colors.primary,
    fontFamily: cStyles.fontFamily,
    fontSize: 20,
    paddingLeft: 10,
  },
});

export default styles;
