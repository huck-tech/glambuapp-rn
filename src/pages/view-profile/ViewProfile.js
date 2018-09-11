import React from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Slick from 'react-native-slick';
import { GlobalStyle } from '@theme';
import styles from './ViewProfile.style';
const { height } = Dimensions.get('screen');

class ViewProfile extends React.PureComponent {
  static navigationOptions = {
    header: null,
  };
  render() {
    const {
      user: { profileImages = {}, name, age, overview },
    } = this.props;
    return (
      <SafeAreaView style={GlobalStyle.fullPageContainer}>
        <ScrollView>
          {profileImages !== null && (
            <Slick
              height={height * 0.55}
              index={0}
              loop={false}
              dot={
                <View
                  style={{
                    backgroundColor: 'rgba(255,255,255,.5)',
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
              {profileImages.map((brick, i) => (
                <View key={i} style={{ flex: 1, position: 'relative' }}>
                  <Image
                    style={{ flex: 1 }}
                    source={{ uri: brick ? brick.imageUrl : null }}
                  />
                  <LinearGradient
                    colors={[
                      '#0000007f',
                      '#0000003f',
                      '#00000000',
                      '#00000000',
                      '#00000000',
                      '#0000003f',
                      '#0000007f',
                    ]}
                    style={styles.linearGradient}
                  />
                </View>
              ))}
            </Slick>
          )}
          <View style={[GlobalStyle.pageContainer, { paddingVertical: 0 }]}>
            <View
              style={{
                borderBottomColor: '#0000001f',
                borderBottomWidth: 1,
                paddingVertical: 20,
              }}>
              <Text>
                <Text style={styles.name}>{name},</Text>
                <Text style={styles.age}>&nbsp;&nbsp;{age}</Text>
              </Text>
              <Text>
                <Text style={{ marginRight: 30 }}>
                  Active this month&nbsp;&nbsp;&nbsp;&nbsp;
                  <FontAwesome
                    name="location-arrow"
                    style={{ marginHorizontal: 15 }}
                  />{' '}
                  1.2 km away
                </Text>
              </Text>
            </View>
            <View style={{ paddingVertical: 20 }}>
              <Text style={styles.subTitle}>About {name}</Text>
              <Text style={styles.bioText}>{overview}</Text>
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          style={{ position: 'absolute', top: 40, left: 20 }}
          onPress={() => this.props.navigation.goBack()}>
          <Ionicons name="md-arrow-back" size={30} color="#fff" />
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
});
export default connect(mapStateToProps)(ViewProfile);
