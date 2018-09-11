import React from 'react';
import { connect } from 'react-redux';
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import { createStackNavigator } from 'react-navigation';
import Header from '../components/Header';
import { Onboarding, MakeOffer, ChangeSettings, ViewProfile } from '../pages';
import SignUpNavigator from './SignUpNavigator';
import BoyTabNavigator from './BoyTabNavigator';
import GirlTabNavigtor from './GirlTabNavigtor';

export const AppNavigator = createStackNavigator(
  {
    Onboarding: {
      screen: Onboarding,
      navigationOptions: {
        header: null,
      },
    },
    RegisterationFlow: {
      screen: SignUpNavigator,
      navigationOptions: {
        header: null,
      },
    },
    BoyTab: {
      screen: BoyTabNavigator,
      navigationOptions: {
        header: <Header />,
      },
    },
    GirlTab: {
      screen: GirlTabNavigtor,
      navigationOptions: {
        header: <Header />,
      },
    },
    MakeOffer: {
      screen: MakeOffer,
    },
    ChangeSettings: {
      screen: ChangeSettings,
    },
    ViewProfile: {
      screen: ViewProfile,
    },
  },
  {
    initialRouteName: 'Onboarding',
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
);
export const middleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav,
);
const App = reduxifyNavigator(AppNavigator, 'root');
const mapStateToProps = state => ({
  state: state.navigationReducer,
});
const AppWithNavigationState = connect(mapStateToProps)(App);
export default AppWithNavigationState;
