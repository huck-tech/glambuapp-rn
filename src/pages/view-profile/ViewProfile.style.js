import { StyleSheet } from "react-native";
import { Fonts } from "@theme";

export default StyleSheet.create({
  linearGradient: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  name: {
    ...Fonts.style.profileName,
  },
  age: {
    ...Fonts.style.profileAge,
  },
  subTitle: {
    ...Fonts.style.subTitle,
  },
  bioText: {
    paddingVertical: 15,
    fontSize: 14,
  },
});
