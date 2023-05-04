import { ImageStyle, StyleSheet, ViewStyle } from "react-native";

import { COLORS, SIZES } from "../../../constants";

type Style = {
  btnContainer: ViewStyle;
  btnImg: ImageStyle;
};

const styles = StyleSheet.create<Style | any>({
  btnContainer: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.small / 1.25,
    justifyContent: "center",
    alignItems: "center",
  },
  btnImg: (dimension: string) => ({
    width: dimension,
    height: dimension,
    borderRadius: SIZES.small / 1.25,
  }),
});

export default styles;
