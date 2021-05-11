import {StyleSheet} from "react-native";
import colors from "../../configs/colors";
const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.primary,
    justifyContent: "space-evenly",
  },
  image: {
    marginTop: 0,
    width: 250,
    height: 150,
  },
});
export default styles;
