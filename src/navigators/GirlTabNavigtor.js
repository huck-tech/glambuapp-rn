import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import { OfferScreen, ProfileSettings } from '../pages';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { Colors } from '@theme';
/* eslint-disable */
const GirlTabNavigator = createBottomTabNavigator(
  {
    OfferTab: {
      screen: OfferScreen,
      navigationOptions: {
        tabBarLabel: 'Offer',
        tabBarIcon: function({ tintColor }) {
          return <Ionicons name="md-paper" color={tintColor} size={30} />;
        },
      },
    },
    AccountTab: {
      screen: ProfileSettings,
      navigationOptions: {
        tabBarLabel: 'Account',
        tabBarIcon: ({ tintColor }) => (
          <SimpleLineIcons name="user" color={tintColor} size={30} />
        ),
      },
    },
  },
  {
    initialRouteName: 'OfferTab',
    tabBarPosition: 'bottom',
    headerStyle: {
      shadowColor: '#0f0',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.8,
      shadowRadius: 5,
      elevation: 1,
      orderBottomWidth: 10,
      borderBottomColor: '#00f',
    },
    tabBarOptions: {
      activeTintColor: Colors.secondary,
      inactiveTintColor: 'gray',
      showIcon: true,
      upperCaseLabel: false,
      removeClippedSubviews: true,
      style: {
        backgroundColor: '#f8f8f8',
        height: 60,
      },
      tabStyle: {
        // padding: 5,
        margin: 0, //Padding 0 here
      },
      indicatorStyle: {
        opacity: 0,
      },
      iconStyle: {
        width: 50,
        height: 30,
      },
      labelStyle: {
        margin: 0,
        marginBottom: 5,
        fontSize: 11,
      },
    },
    animationEnabled: true,
    gestureEnabled: false,
    swipeEnabled: false,
    lazy: true, //fix second tab rendering error
  },
);

export default GirlTabNavigator;
