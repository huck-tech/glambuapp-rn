import React, { Fragment } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncImage from '../AsyncImage';
import { Colors } from '@theme';
const OfferCard = ({
  status,
  onDetail,
  onCall,
  boyImageUrl,
  girlImageUrl,
  name,
  boyName,
  amount,
  reason,
  gender,
  offerTime,
}) => {
  const imageUrl = gender === 'male' ? girlImageUrl : boyImageUrl;
  return (
    <TouchableOpacity
      style={[
        styles.cardWraper,
        {
          backgroundColor: status === 'PENDING' && gender == 'female' ? Colors.secondary : '#fff',
        },
      ]}
      onPress={onDetail}>
      <View style={{ flexDirection: 'row' }}>
        <AsyncImage uri={imageUrl} style={styles.avartaImg} />
        <View style={styles.infoView}>
          <View style={styles.cardHeader}>
            <Text
              style={[
                styles.name,
                {
                  color: status === 'PENDING' && gender == 'female' ? Colors.white : Colors.primary,
                },
              ]}>
              {gender === 'male' ? name : boyName}
            </Text>
            <Text
              style={[
                styles.price,
                {
                  color: status === 'PENDING' && gender == 'female' ? Colors.white : Colors.secondary,
                },
              ]}>
              ${amount}
            </Text>
          </View>
          {status === 'ACCEPTED' && (
            <Fragment>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 5,
                }}>
                <Feather name="check" color="#6e9451" size={14} style={{ paddingRight: 10 }} />
                <Text>Accepted your offer</Text>
              </View>
              {gender === 'male' && (
                <View
                  style={{
                    flexDirection: 'row',
                    paddingVertical: 15,
                    borderTopColor: '#0000001f',
                    borderTopWidth: 1,
                  }}>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginRight: 20,
                    }}
                    onPress={() => onCall('phone', '+1 415-486-4800')}>
                    <MaterialCommunityIcons name="cellphone-android" size={24} color={Colors.secondary} />
                    <Text style={styles.acceptText}>PHONE</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ flexDirection: 'row', alignItems: 'center' }}
                    onPress={() => onCall('whatsapp')}>
                    <FontAwesome name="whatsapp" size={24} color={Colors.secondary} />
                    <Text style={styles.acceptText}>WHATSAPP</Text>
                  </TouchableOpacity>
                </View>
              )}
            </Fragment>
          )}
          {status == 'PENDING' && (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons
                name="md-time"
                color={gender === 'female' ? 'rgba(255, 255, 255, 0.7)' : Colors.commentText}
                size={20}
                style={{ paddingRight: 10, paddingVertical: 10 }}
              />
              <Text style={{ color: gender === 'female' ? 'rgba(255, 255, 255, 0.7)' : Colors.commentText }}>
                {offerTime}
              </Text>
            </View>
          )}
          {status === 'REJECTED' && (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialCommunityIcons
                name="block-helper"
                color="#9c5353"
                size={14}
                style={{ paddingRight: 10, paddingVertical: 10 }}
              />
              {reason && <Text>{reason}</Text>}
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default OfferCard;
const styles = StyleSheet.create({
  cardWraper: {
    borderRadius: 5,
    marginTop: 7,
    paddingTop: 10,
    paddingLeft: 10,
    shadowOffset: { width: 2, height: 4 },
    shadowColor: 'rgba(0, 0, 0, 0.06)',
    shadowOpacity: 0.6,
    elevation: 3,
  },
  avartaImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  infoView: {
    flex: 1,
    paddingLeft: 16,
  },
  cardHeader: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 16,
  },
  name: {
    fontSize: 18,
  },
  price: {
    fontSize: 18,
  },
  acceptText: {
    color: Colors.secondary,
    fontSize: 16,
    paddingLeft: 7,
  },
});
