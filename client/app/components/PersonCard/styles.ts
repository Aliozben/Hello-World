import {StyleSheet} from "react-native";

import cStyles from "../../configs/styles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderColor: cStyles.colors.tritary,
    borderBottomWidth: 1,
  },
  text: cStyles.text,
  picture: {
    width: 60,
    height: 60,
    borderRadius: 50,
    margin: 10,
    marginHorizontal: 20,
  },
});

export default styles;
