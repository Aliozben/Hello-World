import {Platform, StyleSheet} from "react-native";
// import colors from "../../configs/colors";
import mainStyles from "../../configs/styles";

const styles = StyleSheet.create({
  button: {
    backgroundColor: mainStyles.colors.tritary,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "95%",
    marginVertical: "2%",
  },
  buttonOnlyBorder: {
    borderColor: mainStyles.colors.tritary,
    borderWidth: 2,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "95%",
    marginVertical: "2%",
  },
  textWithBorder: {
    color: mainStyles.colors.tritary,
    fontFamily: mainStyles.fontFamily,
    fontSize: 36,
    textTransform: "uppercase",
  },
  text: {
    color: mainStyles.colors.primary,
    fontFamily: mainStyles.fontFamily,
    fontSize: 36,
    textTransform: "uppercase",
  },
});

export default styles;
