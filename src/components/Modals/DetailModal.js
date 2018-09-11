import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
import AsyncImage from '../AsyncImage';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { GlobalStyle, Colors } from '@theme';
const { width, height } = Dimensions.get('window');

const DetailModal = ({ visible, onClose, name, amount, letter, offerTime, imageUrl, isReject, onReject }) => (
  <Modal animationType="fade" transparent visible={visible} onRequestClose={onClose}>
    <View style={[GlobalStyle.overlayView, { backgroundColor: '#0000007f' }]}>
      <View style={[styles.modalView, { padding: 0 }]}>
        <View style={styles.modalHeader}>
          <Foundation name="info" color="#fff" size={30} />
          <Text style={styles.modalHeaderText}>Offer Details</Text>
        </View>
        <View style={{ flex: 1, padding: 20 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <AsyncImage
                uri={imageUrl}
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
          <ScrollView style={{ maxHeight: 100 }}>
            <Text style={{ fontSize: 16, paddingVertical: 20, lineHeight: 26 }}>{letter}</Text>
          </ScrollView>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="md-time" color="#00000061" size={20} style={{ paddingRight: 10 }} />
            <Text>{offerTime}</Text>
          </View>
          <View style={styles.btnGroup}>
            {isReject && (
              <TouchableOpacity style={styles.submitBtn} onPress={() => onReject('CANCELED')}>
                <Text style={{ color: Colors.secondary }}>REJECT</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.submitBtn} onPress={onClose}>
              <Text style={{ color: Colors.secondary }}>CLOSE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  </Modal>
);
DetailModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
const styles = StyleSheet.create({
  modalView: {
    width: width - 40,
    height: height / 2,
    backgroundColor: '#fff',
    padding: 20,
  },
  modalHeader: {
    height: 56,
    backgroundColor: Colors.primary,
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
    flexDirection: 'row',
    justifyContent: 'flex-end',
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: 20,
  },
  submitBtn: {
    paddingLeft: 20,
  },
  priceText: {
    fontWeight: '600',
    color: Colors.black,
  },
});
export default DetailModal;
