import {StyleSheet} from "react-native";

import cStyles from "../../configs/styles";

const styles = StyleSheet.create({
  container: {
    height: 90,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: cStyles.colors.secondary,
    borderBottomWidth: 1,
    borderColor: cStyles.colors.tritary,
  },
  text: {
    marginLeft: 30,
    color: cStyles.colors.tritary,
    fontFamily: cStyles.fontFamily,
    fontSize: 20,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    marginLeft: 20,
    backgroundColor: cStyles.colors.tritary,
  },
  image: {
    width: 90,
    height: 90,
  },
});

export default styles;
