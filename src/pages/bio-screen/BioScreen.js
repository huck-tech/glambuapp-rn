import React from 'react';
import { connect } from 'react-redux';
import { putOverview } from '../../actions/user';
import { View, Text, Image, TextInput, ActivityIndicator } from 'react-native';
import { GlobalStyle, Images, Colors } from '@theme';
import BottomButton from '../../components/BottomButton';

import styles from './BioScreen.style';

class BioScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bio: '',
    };
  }
  onNext = () => {
    this.props.putOverview(this.state.bio);
  };
  renderTitle() {
    if (this.props.gender === 'male') {
      return <Text style={styles.title}>Wow, you simply look like a real boss!</Text>;
    } else {
      return <Text style={styles.title}>Wow, you look hot!</Text>;
    }
  }
  renderGuide() {
    if (this.props.gender === 'male') {
      return (
        <Text style={styles.desc}>
          Now tell us something about your self.{'\n'}You can write about your hobbies, values, net worth, and visions
          in life.
        </Text>
      );
    } else {
      return (
        <Text style={styles.desc}>
          Now tell us something about yourself. You can write about your hobbies, values and vision in life, or the kind
          of gentleman you would like to meet. Some guys would like to know your instagram username and some guys would
          like to know your expected price of date.
        </Text>
      );
    }
  }
  renderLoading() {
    if (this.props.isLoading) {
      return (
        <View style={[GlobalStyle.overlayView, { backgroundColor: Colors.bkColorOpacity }]}>
          <ActivityIndicator size="large" color={Colors.secondary} />
        </View>
      );
    }
  }

  render() {
    const { bio } = this.state;
    const { gender } = this.props;
    return (
      <View style={GlobalStyle.fullPageContainer}>
        <View style={GlobalStyle.pageContainer}>
          <View style={[GlobalStyle.container, { justifyContent: 'flex-start' }]}>
            {this.renderTitle()}
            {this.renderGuide()}
            <TextInput
              placeholder="Your Profile text"
              style={styles.nameInput}
              value={bio}
              underlineColorAndroid={Colors.commentText}
              onChangeText={bio => this.setState({ bio })}
              maxLength={500}
              multiline
              maxHeight={150}
            />
            <Text style={styles.maxLength}>{bio.length} / 500</Text>
          </View>
          <View style={GlobalStyle.wrapper}>
            <Image source={Images.IC_COMMENTS} />
            <Text style={styles.commentText}>
              For more info, questions, feedback and perhaps to say hello, kindly send an e-mail to hello@glambu.com. We
              will respond within 24 hours :-)
            </Text>
          </View>
        </View>
        <BottomButton
          name={gender === 'male' ? "Finished, let's go!" : 'Go to final step'}
          active={bio.length != 0}
          onPress={this.onNext}
        />
        {this.renderLoading()}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  gender: state.user.gender,
});

const mapDispatchToProps = dispatch => ({
  putOverview: text => dispatch(putOverview(text)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BioScreen);
