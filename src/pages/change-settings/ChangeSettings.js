import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, Platform } from 'react-native';
import { connect } from 'react-redux';
import { TextField } from 'react-native-material-textfield';
import { setUser } from '../../actions/user';
import { Colors } from '@theme';
import IonIcons from 'react-native-vector-icons/Ionicons';
import styles from './ChangeSettings.style';
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 0 : StatusBar.currentHeight;

class ChangeSettings extends React.PureComponent {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: 'Profile Settings',
      headerStyle: {
        backgroundColor: '#2b2f3b',
        paddingTop: STATUSBAR_HEIGHT,
        height: 56 + STATUSBAR_HEIGHT,
      },
      headerLeft: (
        <TouchableOpacity style={{ paddingLeft: 20 }} onPress={() => navigation.goBack()}>
          <IonIcons name="md-close" size={26} color="#fff" />
        </TouchableOpacity>
      ),
      headerRight: (
        <TouchableOpacity style={{ paddingRight: 20 }} onPress={params.onSave}>
          <Text style={{ color: '#ffffff80' }}>SAVE</Text>
        </TouchableOpacity>
      ),
      headerTitleStyle: {
        color: '#fff',
        fontWeight: '300',
      },
    };
  };
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      bio: '',
    };
  }
  componentDidMount() {
    this.props.navigation.setParams({ onSave: this.onSave });
  }
  onSave = () => {
    const data = {
      name: this.state.name,
      overview: this.state.bio,
    };

    this.props.changeUserData(data);
  };

  render() {
    const { name, bio } = this.state;
    return (
      <SafeAreaView style={{ padding: 20 }}>
        <StatusBar backgroundColor="#4000002f" translucent />
        <TextField
          label="What is your name?"
          value={name}
          onChangeText={name => this.setState({ name })}
          tintColor={Colors.secondary}
        />
        <View style={{ paddingVertical: 20 }}>
          <Text style={styles.desc}>
            Now tell us something about your self. You can write about your hobbies, values, net worth and visions in
            life.
          </Text>
          <TextField
            label=""
            style={styles.nameInput}
            value={bio}
            onChangeText={bio => this.setState({ bio })}
            maxLength={500}
            tintColor={Colors.secondary}
            multiline
            maxHeight={150}
          />
          <Text style={styles.maxLength}>{bio.length} / 500</Text>
        </View>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => ({
  gender: state.user.gender,
});
const mapDispatchToProps = dispatch => ({
  changeUserData: data => dispatch(setUser(data)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChangeSettings);
