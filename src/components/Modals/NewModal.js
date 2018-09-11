import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { GlobalStyle, Colors } from '@theme';
const { width, height } = Dimensions.get('window');

const NewModal = ({ visible, onClose, name, amount, letter, offerTime, imageUrl, onConfirm, loading }) => (
  <Modal animationType="fade" transparent visible={visible} onRequestClose={onClose}>
    <View style={[GlobalStyle.overlayView, { backgroundColor: '#0000007f' }]}>
      <View style={[styles.modalView, { padding: 0 }]}>
        <View style={styles.modalHeader}>
          <MaterialCommunityIcons name="currency-usd" color="#fff" size={30} />
          <Text style={styles.modalHeaderText}>New Offer</Text>
        </View>
        <View style={{ flex: 1, padding: 20 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={{ uri: imageUrl }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  marginRight: 20,
                }}
              />
              <Text style={[{ fontSize: 18, color: '#000000de' }]}>{name}</Text>
            </View>
            <Text style={styles.priceText}>Price: ${amount}</Text>
          </View>
          <ScrollView style={{ maxHeight: 150 }}>
            <Text style={{ fontSize: 16, paddingVertical: 20, lineHeight: 26 }}>{letter}</Text>
          </ScrollView>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="md-time" color="#00000061" size={20} style={{ paddingRight: 10 }} />
            <Text>{offerTime}</Text>
          </View>
          <View style={styles.btnGroup}>
            <TouchableOpacity style={styles.submitBtn} onPress={() => onConfirm('ACCEPTED')}>
              <Ionicons name="md-checkmark" color="#6e9451" size={20} style={{ paddingRight: 10 }} />
              <Text style={{ color: Colors.black }}>ACCEPT THIS OFFER</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitBtn} onPress={() => onConfirm('REJECTED')}>
              <MaterialCommunityIcons name="block-helper" color="#9c5353" size={20} style={{ paddingRight: 10 }} />
              <Text style={{ color: Colors.black }}>REJECT THIS OFFER</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitBtn} onPress={onClose}>
              <Text style={{ color: Colors.secondary }}>CLOSE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {loading && (
        <View style={[GlobalStyle.overlayView, { backgroundColor: Colors.bkColorOpacity }]}>
          <ActivityIndicator size="large" color={Colors.secondary} />
        </View>
      )}
    </View>
  </Modal>
);
NewModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
const styles = StyleSheet.create({
  modalView: {
    width: width - 40,
    height: height * 0.7,
    backgroundColor: '#fff',
    padding: 20,
  },
  modalHeader: {
    height: 56,
    backgroundColor: Colors.secondary,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  modalHeaderText: {
    fontSize: 20,
    color: '#ffffff',
    paddingLeft: 5,
  },
  btnGroup: {
    justifyContent: 'flex-end',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  submitBtn: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  priceText: {
    fontWeight: '600',
    color: Colors.black,
  },
});
export default NewModal;
