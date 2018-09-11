import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';
import { GlobalStyle, Colors } from '@theme';
const { width, height } = Dimensions.get('window');

export default class RejectedModal extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      value: '',
    };
  }
  onSelect(index, value) {
    this.setState({ index, value });
  }
  render() {
    const { visible, onClose, name, onReject } = this.props;
    return (
      <Modal animationType="fade" transparent visible={visible} onRequestClose={onClose}>
        <View style={[GlobalStyle.overlayView, { backgroundColor: '#0000007f' }]}>
          <View style={[styles.modalView, { padding: 0 }]}>
            <View style={{ flex: 1, padding: 20 }}>
              <Text style={styles.modalHeaderText}>Rejection Reason</Text>

              <Text style={{ fontSize: 16, paddingVertical: 20, lineHeight: 26 }}>
                Too bad, you guys don't like each other. Do you have any feedback for {name}?
              </Text>

              <ScrollView style={{ flex: 1 }}>
                <RadioGroup
                  onSelect={(index, value) => this.onSelect(index, value)}
                  size={24}
                  thickness={2}
                  color={'#0000008f'}
                  activeColor={Colors.secondary}
                  selectedIndex={this.state.index}>
                  <RadioButton value={`I don't have time.`}>
                    <Text>I don't have time.</Text>
                  </RadioButton>

                  <RadioButton value={'Not enough pictures'}>
                    <Text>Not enough pictures</Text>
                  </RadioButton>

                  <RadioButton value={'Offer too low'}>
                    <Text>Offer too low</Text>
                  </RadioButton>
                </RadioGroup>
              </ScrollView>

              <View style={styles.btnGroup}>
                <TouchableOpacity style={styles.submitBtn} onPress={onClose}>
                  <Text style={{ color: '#0000008f' }}>CLOSE</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.submitBtn} onPress={() => onReject(this.state.value)}>
                  <Text style={{ color: Colors.secondary }}>REJECT</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}
RejectedModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
const styles = StyleSheet.create({
  modalView: {
    width: width - 80,
    height: height * 0.65,
    backgroundColor: '#fff',
    padding: 20,
  },
  modalHeaderText: {
    fontSize: 20,
    color: Colors.black,
    paddingLeft: 5,
    fontWeight: 'bold',
  },
  btnGroup: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    padding: 20,
    borderTopWidth: 1,
    borderColor: '#cdcdcd',
  },
  submitBtn: {
    paddingLeft: 20,
  },
  priceText: {
    fontWeight: '600',
    color: Colors.black,
  },
});
