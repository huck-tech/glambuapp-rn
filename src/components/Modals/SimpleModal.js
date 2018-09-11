import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { GlobalStyle, Colors } from "@theme";
const { width } = Dimensions.get("screen");

const SimpleModal = ({
  visible,
  onClose,
  onConfirm,
  title,
  description,
  cancelText,
  confirmText,
}) => (
  <Modal
    animationType="fade"
    transparent
    visible={visible}
    onRequestClose={onClose}>
    <View style={[GlobalStyle.overlayView, { backgroundColor: "#0000007f" }]}>
      <View style={styles.modalView}>
        <View>
          <Text
            style={{ fontSize: 20, fontWeight: "bold", color: "#000000de" }}>
            {title}
          </Text>
        </View>
        <View>
          <Text style={{ fontSize: 16, paddingVertical: 20, lineHeight: 26 }}>
            {description}
          </Text>
          <View style={styles.btnGroup}>
            <TouchableOpacity style={styles.submitBtn} onPress={onClose}>
              <Text style={{ color: Colors.secondary }}>{cancelText}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitBtn} onPress={onConfirm}>
              <Text style={{ color: Colors.secondary }}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  </Modal>
);
export default SimpleModal;
const styles = StyleSheet.create({
  modalView: {
    width: width - 80,
    padding: 25,
    backgroundColor: "#fff",
  },
  btnGroup: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  submitBtn: {
    paddingLeft: 20,
  },
});
