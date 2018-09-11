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
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
const { width } = Dimensions.get("screen");

const ActionModal = ({ visible, onClose }) => (
  <Modal
    animationType="slide"
    transparent
    visible={visible}
    onRequestClose={() => onClose()}>
    <View style={[GlobalStyle.overlayView, { backgroundColor: "#0000007f" }]}>
      <View style={styles.actionsheet}>
        <TouchableOpacity style={styles.actionBtn}>
          <MaterialCommunityIcons
            name="account-plus"
            color="#000000de"
            size={20}
          />
          <Text
            style={{
              fontSize: 16,
              color: "#000000de",
              marginLeft: 20,
            }}>
            Creat New Contact
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <Ionicons name="md-call" color="#000000de" size={20} />
          <Text
            style={{
              fontSize: 16,
              color: "#000000de",
              marginLeft: 20,
            }}>
            Call
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <MaterialCommunityIcons name="message" color="#000000de" size={20} />
          <Text
            style={{
              fontSize: 16,
              color: "#000000de",
              marginLeft: 20,
            }}>
            Send SMS
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <MaterialCommunityIcons
            name="content-copy"
            color="#000000de"
            size={20}
          />
          <Text
            style={{
              fontSize: 16,
              color: "#000000de",
              marginLeft: 20,
            }}>
            Copy
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
ActionModal.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
};
ActionModal.defaultProps = {
  visible: false,
  onClose: () => console.log("closed"), //eslint-disable-line
};
export default ActionModal;
