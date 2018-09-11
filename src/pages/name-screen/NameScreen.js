import React from 'react';
import { View, Text, TextInput, Image, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import { putName } from '../../actions/user';
import { GlobalStyle, Colors, Images } from '@theme';
import BottomButton from '../../components/BottomButton';
import styles from './NameScreen.style';

class NameScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }
  onNext = () => {
    this.props.putName(this.state.name);
  };
  render() {
    const { name } = this.state;
    const { gender } = this.props;
    return (
      <View style={GlobalStyle.fullPageContainer}>
        <View style={GlobalStyle.pageContainer}>
          <View style={GlobalStyle.container}>
            <Text style={styles.title}>Hi {gender === 'male' ? 'Mr. ...' : 'Mrs. ...'}</Text>
            <TextInput
              placeholder="What is your name?"
              style={styles.nameInput}
              value={name}
              underlineColorAndroid={Colors.commentText}
              onChangeText={name => this.setState({ name })}
            />
          </View>
          <View style={GlobalStyle.wrapper}>
            <Image source={Images.IC_COMMENTS} />
            <Text style={styles.commentText}>
              Did you know that gentlemen have extremely high extremely high privacy at Glambu? It&apos;s only a girl
              you sent a date offer to can view your profile!
            </Text>
          </View>
        </View>
        <BottomButton name="Next" active={name.length != 0} onPress={this.onNext} />
        {this.props.isLoading && (
          <View style={[GlobalStyle.overlayView, { backgroundColor: Colors.bkColorOpacity }]}>
            <ActivityIndicator size="large" color={Colors.secondary} />
          </View>
        )}
      </View>
    );
  }
}
const mapStateToProps = ({ user }) => ({
  gender: user.gender,
  userId: user.userId,
  isLoading: user.isLoading,
});
const mapDispatchToProps = dispatch => ({
  putName: name => dispatch(putName(name)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NameScreen);
