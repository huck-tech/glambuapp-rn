import React from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import PropTypes from "prop-types";
import { GlobalStyle, Colors } from "@theme";
import Ionicons from "react-native-vector-icons/Ionicons";
const { width } = Dimensions.get("screen");

const ImagePickerModal = ({ visible, onClose, onLibrary, onCamera }) => (
  <Modal
    animationType="fade"
    transparent
    visible={visible}
    onRequestClose={() => onClose()}>
    <View style={[GlobalStyle.overlayView, { backgroundColor: "#0000007f" }]}>
      <View style={styles.actionsheet}>
        <View style={styles.actionBtn}>
          <Text>Add Photo</Text>
        </View>
        <TouchableOpacity style={styles.actionBtn} onPress={onLibrary}>
          <Ionicons name="md-cloud-upload" color="#000000de" size={20} />
          <Text
            style={{
              fontSize: 16,
              color: "#000000de",
              marginLeft: 20,
            }}>
            Upload
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} onPress={onCamera}>
          <Ionicons name="md-camera" color="#000000de" size={20} />
          <Text
            style={{
              fontSize: 16,
              color: "#000000de",
              marginLeft: 20,
            }}>
            Use camera
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);
const styles = StyleSheet.create({
  actionsheet: {
    position: "absolute",
    bottom: 0,
    width: width,
    backgroundColor: Colors.bkColor,
  },
  actionBtn: {
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
  },
});
ImagePickerModal.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  onCamera: PropTypes.func,
  onLibrary: PropTypes.func,
};
ImagePickerModal.defaultProps = {
  visible: false,
  onClose: () => console.log("closed"), //eslint-disable-line
};
export default ImagePickerModal;
