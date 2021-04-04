import {Platform} from "react-native";

import colors from "./colors";
export default {
  colors,
  text: {
    color: colors.tritary,
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "monospace" : "Avenir",
  },
  fontFamily: Platform.OS === "android" ? "monospace" : "Avenir",
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
};
