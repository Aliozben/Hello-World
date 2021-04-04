import {StyleSheet} from "react-native";

import cStyle from "../../configs/styles";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: cStyle.colors.tritary,
    paddingLeft: 10,
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },
  upperContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingBottom: 5,
  },
  userName: {
    color: cStyle.colors.tritary,
    fontFamily: cStyle.fontFamily,
    fontSize: 24,
    fontWeight: "700",
  },
  text: cStyle.text,
  picture: {
    height: 65,
    width: 65,
    margin: 10,
    borderRadius: 50,
  },
  timeStamp: {
    color: cStyle.colors.tritary,
    fontFamily: cStyle.fontFamily,
    fontStyle: "italic",
    fontSize: 15,
    paddingLeft: 10,
  },
});

export default styles;
