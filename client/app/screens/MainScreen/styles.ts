import {StyleSheet} from "react-native";

import colors from "../../configs/colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    flex: 1,
    alignItems: "center",
  },
  newChatButton: {
    position: "absolute",
    bottom: 10,
    backgroundColor: colors.tritary,
    borderRadius: 50,
    width: 70,
    height: 70,
    overflow: "visible",
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  chatImage: {
    width: 100,
    height: 100,
  },
  messages: {
    flex: 1,
    width: "100%",
  },
});
export default styles;
