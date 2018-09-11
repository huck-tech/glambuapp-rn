import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
const SettingsButton = props => (
  <TouchableOpacity style={style.btn} onPress={props.onPress}>
    <Text style={{ color: props.primary ? "#b85c5c" : "#000", fontSize: 16 }}>
      {props.text}
    </Text>
    <Text>{props.subTitle}</Text>
  </TouchableOpacity>
);
export default SettingsButton;
const style = StyleSheet.create({
  btn: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderColor: "#d6d7da",
    borderBottomWidth: 1,
  },
});
