import React from 'react';
import moment from 'moment';
import { View, StatusBar, Image, Text, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import Slick from 'react-native-slick';
import { requestCameraPermission, requestLocationPermission, requestStoragePermission } from '../../utils/permissions';
import { fetchUser, setLoading } from '../../actions/user';
import { LoginManager, AccessToken, GraphRequestManager, GraphRequest } from 'react-native-fbsdk';

import FBLoginView from '../../components/FBLoginView';

import { GlobalStyle, Images, Colors } from '@theme';

import Slide1 from './slide1';
import Slide2 from './slide2';
import Slide3 from './slide3';
import Slide4 from './slide4';
import Slide5 from './slide5';
import styles from './onboarding.style';

const { height } = Dimensions.get('window');

class Onboarding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceToken: '',
      latitude: 0,
      longitude: 0,
      error: null,
    };

    requestCameraPermission();
    requestLocationPermission();
    requestStoragePermission();
  }

  componentDidMount() {
    firebase
      .messaging()
      .getToken()
      .then(token => {
        this.setState({ deviceToken: token });
      });

    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState(
          {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
          },
          () => {
            if (this.props.user.completeRegister) {
              this.props.setLoading(true);
              this.props.fetchUser({
                userId: this.props.user.userId,
                gender: this.props.user.gender,
                deviceToken: this.state.deviceToken,
                location: {
                  latitude: this.state.latitude,
                  longitude: this.state.longitude,
                },
              });
            }
          },
        );
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000 },
    );
  }

  onLogin = () => {
    LoginManager.setLoginBehavior('WEB_ONLY');
    LoginManager.logInWithReadPermissions(['email', 'public_profile', 'user_gender', 'user_birthday'])
      .then(result => {
        if (result.isCancelled) {
          //eslint-disable-next-line
          console.warn('Login Canceled');
        } else {
          this.props.setLoading(true);
          AccessToken.getCurrentAccessToken().then(data => {
            const { accessToken } = data;
            const infoRequest = new GraphRequest(
              '/me',
              {
                accessToken: accessToken,
                parameters: {
                  fields: {
                    string: 'email, age_range, gender, birthday',
                  },
                },
              },
              this.initUser,
            );
            new GraphRequestManager().addRequest(infoRequest).start();
          });
        }
      })
      .catch(err => {
        //eslint-disable-next-line
        console.warn('Login faild with error: ', err);
      });
  };
  initUser = (err, results) => {
    if (!err) {
      const { email, userId, gender, age, deviceToken } = {
        email: results.email,
        userId: results.id,
        gender: results.gender,
        deviceToken: this.state.deviceToken,
        age: moment().diff(new Date(results.birthday), 'years'),
      };
      this.props.setLoading(true);
      this.props.fetchUser({
        email,
        userId,
        gender,
        age,
        deviceToken,
        location: {
          latitude: this.state.latitude,
          longitude: this.state.longitude,
        },
      });
    } else {
      //eslint-disable-next-line
      console.warn('ERROR GETTING DATA FROM FACEBOOK');
    }
  };
  static getDerivedStateFromProps(props) {
    if (!props.isLoading) {
      LoginManager.logOut();
    }
    return {};
  }

  render() {
    return (
      <View style={GlobalStyle.fullPageContainer}>
        <StatusBar backgroundColor="#4000002f" translucent />
        <Image source={Images.BG_GRAD_ONBOARDING} style={styles.topBackground} resizeMode="stretch" />
        <View style={[GlobalStyle.pageContainer, { paddingHorizontal: 0 }]}>
          <Slick
            height={height * 0.75}
            index={0}
            loop={false}
            dot={
              <View
                style={{
                  backgroundColor: 'rgba(255,255,255,.5)',
                  width: 6,
                  height: 6,
                  borderRadius: 3,
                  margin: 3,
                }}
              />
            }
            activeDot={
              <View
                style={{
                  backgroundColor: '#ffffff',
                  width: 6,
                  height: 6,
                  borderRadius: 3,
                  marginLeft: 3,
                  marginRight: 3,
                  marginTop: 3,
                  marginBottom: 3,
                }}
              />
            }
            paginationStyle={{
              bottom: 20,
            }}>
            <Slide1 />
            <Slide2 />
            <Slide3 />
            <Slide4 />
            <Slide5 />
          </Slick>
          <Text style={styles.desc}>
            We do not post in your name. We only use Facebook to login. 100% privacy guaranteed.
          </Text>
          <View style={styles.signinBtn}>
            <TouchableOpacity onPress={this.onLogin}>
              <FBLoginView />
            </TouchableOpacity>
          </View>
        </View>
        {(this.props.isLoading || !this.state.deviceToken) && (
          <View style={[GlobalStyle.overlayView, { backgroundColor: Colors.bkColorOpacity }]}>
            <ActivityIndicator size="large" color={Colors.secondary} />
          </View>
        )}
      </View>
    );
  }
}
const mapStateToProps = ({ user }) => ({
  isLoading: user.isLoading,
  user: user,
});
const mapDispatchToProps = dispatch => ({
  fetchUser: userData => dispatch(fetchUser(userData)),
  setLoading: flag => dispatch(setLoading(flag)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Onboarding);
