import {Platform, StyleSheet} from "react-native";

import colors from "../../configs/colors";

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "monospace" : "Avenir",
    color: colors.tritary,
  },
});

export default styles;
