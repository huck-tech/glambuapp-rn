import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import { GlobalStyle, Images, Fonts, Colors } from '@theme';

const { width, height } = Dimensions.get('screen');

const AcceptedModal = ({ visible, onClose, onCall, onDetail }) => (
  <Modal
    animationType="fade"
    transparent
    visible={visible}
    onRequestClose={onClose}>
    <View style={[GlobalStyle.overlayView, { backgroundColor: '#0000007f' }]}>
      <View style={styles.acceptedModal}>
        <View style={styles.acceptedModalHeader}>
          <Image
            source={Images.BG_ACCEPTED_MODAL}
            style={styles.modalHeaderImage}
            resizeMode="stretch"
          />
          <Text style={styles.acceptedHeadertText}>Contratulation!</Text>
        </View>
        <View style={styles.acceptedModalBody}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={Images.IMG_ONBOARDING_SLIDE1}
                style={{ width: 40, height: 40, borderRadius: 20 }}
              />
              <Text style={[styles.subTitle, { color: '#000000de' }]}>
                Claudia
              </Text>
            </View>
            <Text style={([styles.subTitle], { fontWeight: 'bold' })}>
              Price: $10
            </Text>
          </View>
          <Text
            style={{
              fontSize: 15,
              paddingVertical: 25,
              lineHeight: 24,
              color: '#0000008a',
            }}>
            Amelia accepted your offer.{'\n'}Please contact her as soon as
            possible.
          </Text>
          <View>
            <View>
              <TouchableOpacity style={styles.contactModeView} onPress={onCall}>
                <MaterialCommunityIcons
                  name="cellphone-android"
                  size={24}
                  color="#000000"
                />
                <Text style={styles.acceptText}>+1 415-486-4800</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.contactModeView} onPress={onCall}>
                <FontAwesome name="whatsapp" size={24} color="#000000" />
                <Text style={styles.acceptText}>WhatsApp</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.contactModeView}
                onPress={onDetail}>
                <Foundation name="info" color="#000000" size={30} />
                <Text style={styles.acceptText}>Offer Details</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={{ fontSize: 11, color: '#00000061' }}>
            Now you can contact her on Whatsapp or by phone.{'\n'}A short
            confirmation on the date details is recommended. Also, we recommend
            putting her gift-money in an envenlop and give her at begining of
            date.
          </Text>
          <View style={styles.btnGroup}>
            <TouchableOpacity style={styles.submitBtn} onPress={onClose}>
              <Text style={{ color: Colors.secondary }}>CLOSE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  </Modal>
);
const styles = StyleSheet.create({
  acceptedModal: {
    width: width - 40,
    height: height - 120,
    backgroundColor: '#fff',
    borderRadius: 3,
  },
  acceptedModalHeader: {
    position: 'relative',
    alignSelf: 'stretch',
    height: height / 6,
  },
  modalHeaderImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  acceptedHeadertText: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    paddingVertical: 15,
    paddingHorizontal: 20,
    fontSize: 24,
    color: '#fff',
  },
  acceptedModalBody: {
    flex: 1,
    padding: 20,
  },
  subTitle: {
    ...Fonts.style.subTitle,
  },
  acceptText: {
    fontSize: 16,
    color: '#000',
    paddingLeft: 15,
  },
  contactModeView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
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
});
AcceptedModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCall: PropTypes.func.isRequired,
  onDetail: PropTypes.func.isRequired,
};
export default AcceptedModal;
