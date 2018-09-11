import React from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import { Colors } from '@theme';

const Toast = ({ visible, title, onClose }) => (
  <Modal
    animationType={'slide'}
    visible={visible}
    transparent
    onRequestClose={onClose}>
    <View style={styles.wrapper}>
      <View>
        <Text style={{ color: '#fff' }}>{title}</Text>
      </View>
    </View>
  </Modal>
);
const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 48,
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 40,
  },
});
export default Toast;
