import { StyleSheet, Dimensions } from "react-native";
import { Fonts } from "@theme";
const { width } = Dimensions.get("screen");

export default StyleSheet.create({
  container: {
    width: width,
    backgroundColor: "#4267b2",
    paddingVertical: 15,
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    marginLeft: 20,
    textAlign: "center",
    color: "#fff",
    fontSize: Fonts.size.h4,
  },
});
