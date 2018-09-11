import { StyleSheet } from "react-native";
import { Fonts } from "@theme";

export default StyleSheet.create({
  nameInput: {
    fontSize: Fonts.size.h4,
  },
  desc: {
    fontSize: 14,
  },
  maxLength: {
    ...Fonts.style.comments,
    textAlign: "right",
  },
});
