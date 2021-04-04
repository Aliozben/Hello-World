import {StyleSheet} from "react-native";
import colors from "../../configs/colors";
const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  image: {
    marginTop: 0,
    width: 260,
    height: 140,
  },
});
export default styles;
