import {StyleSheet} from "react-native";
import colors from "../../configs/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: colors.primary,
    alignItems: "center",
    width: "100%",
  },
  logo: {
    marginTop: "35%",
    width: 200,
    height: 200,
  },
  buttonContainer: {width: "100%", alignItems: "center"},
});
export default styles;
