import React from 'react';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import {
  HomeScreen,
  FindingGirls,
  OfferScreen,
  ProfileSettings,
} from '../pages';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { Colors } from '@theme';
/* eslint-disable */
const HomeNav = createStackNavigator(
  {
    FindHome: {
      screen: HomeScreen,
    },
    FindGirlScreen: {
      screen: FindingGirls,
    },
  },
  {
    initialRouteName: 'FindHome',
    navigationOptions: {
      header: null,
    },
  },
);
const BoyTabNavigator = createBottomTabNavigator(
  {
    FindTab: {
      screen: HomeNav,
      navigationOptions: {
        tabBarLabel: 'Find',
        tabBarIcon: ({ tintColor }) => (
          <MaterialIcons name="dashboard" color={tintColor} size={30} />
        ),
      },
    },
    OfferTab: {
      screen: OfferScreen,
      navigationOptions: {
        tabBarLabel: 'Offer',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="md-paper" color={tintColor} size={30} />
        ),
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
    initialRouteName: 'FindTab',
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

export default BoyTabNavigator;
