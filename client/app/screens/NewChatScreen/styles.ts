import {StyleSheet} from "react-native";

import colors from "../../configs/colors";
import cStyles from "../../configs/styles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  banners: {
    borderColor: colors.tritary,
    borderBottomWidth: 10,
  },
  text: cStyles.text,
});

export default styles;
