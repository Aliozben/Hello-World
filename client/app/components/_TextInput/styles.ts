import {StyleSheet} from "react-native";

import mainStyles from "../../configs/styles";

const styles = StyleSheet.create({
  container: {
    backgroundColor: mainStyles.colors.secondary,
    borderRadius: 50,
    padding: 10,
    width: "100%",
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
  },
  icon: {
    width: "7%",
    marginRight: 5,
  },
  textInput: {
    color: mainStyles.colors.tritary,
    fontSize: 18,
    width: "90%",
    fontFamily: mainStyles.fontFamily,
  },
});

export default styles;
