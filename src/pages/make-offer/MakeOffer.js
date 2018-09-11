import React from 'react';
import { View, Text, Dimensions, Image, ActivityIndicator, ScrollView, Modal, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Slick from 'react-native-slick';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { TextField } from 'react-native-material-textfield';
import { GlobalStyle, Colors } from '@theme';
import { sentOffer } from '../../actions/engage';
import { setLoading } from '../../actions/user';
import { DetailModal } from '../../components/Modals';
import { getFriendsData, checkingMatchOffer } from '../../utils/globalFuctions';
import BottomButton from '../../components/BottomButton';
import Toast from '../../components/Toast';
import styles from './MakeOffer.style';

const { height } = Dimensions.get('window');

class MakeOffer extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);

    this.state = {
      friendData: null,
      loading: true,
      makeOfferModal: false,
      amount: '',
      offerDetail: '',
      showNotification: false,
      sent: false,
      viewOfferModal: false,
      lastOffer: props.lastOffer,
    };
  }
  componentDidMount() {
    const userId = this.props.navigation.getParam('userId', '');
    checkingMatchOffer(this.props.offers, userId).then(result => {
      if (result && result.status === 'PENDING') {
        this.setState({
          makeOfferModal: false,
          sent: true,
          lastOffer: result,
          loading: false,
        });
      }
      getFriendsData(userId, this.props.gender).then(friendData => {
        this.setState({ loading: false, friendData: friendData });
      });
    });
  }
  static getDerivedStateFromProps(props, state) {
    if (JSON.stringify(props.lastOffer) !== JSON.stringify(state.lastOffer) && state.makeOfferModal) {
      return {
        makeOfferModal: false,
        showNotification: true,
        sent: true,
        lastOffer: props.lastOffer,
      };
    }
    return null;
  }

  componentDidUpdate() {
    if (this.state.showNotification) {
      //eslint-disable-next-line
      setTimeout(() => {
        this.setState({ showNotification: false });
      }, 2000);
    }
  }
  setModalVisible = visible => {
    this.setState({ makeOfferModal: visible });
  };
  onSentOffer = () => {
    const {
      friendData: { userId, name },
      amount,
      offerDetail,
    } = this.state;
    this.props.setLoading(true);
    this.props.sentOffer(userId, amount, offerDetail, name, this.state.friendData.imageUrls[0]);
  };
  goBack = () => {
    this.props.navigation.goBack();
  };

  renderLoading() {
    if (this.props.isLoading || !this.state.friendData) {
      return (
        <View style={[GlobalStyle.overlayView, { backgroundColor: Colors.bkColorOpacity }]}>
          <ActivityIndicator size="large" color={Colors.secondary} />
        </View>
      );
    }
  }
  render() {
    const { friendData, lastOffer, showNotification } = this.state;
    const nearby = this.props.navigation.getParam('nearby', '');
    return (
      <View style={GlobalStyle.fullPageContainer}>
        <ScrollView style={{ flex: 1 }}>
          {friendData && (
            <Slick
              height={height * 0.6}
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
              {friendData.imageUrls.map((uri, i) => (
                <View key={i} style={{ flex: 1, position: 'relative' }}>
                  <Image style={{ flex: 1 }} source={{ uri: uri }} />
                  <LinearGradient
                    colors={['#0000007f', '#0000003f', '#00000000', '#00000000', '#00000000', '#0000003f', '#0000007f']}
                    style={styles.linearGradient}
                  />
                </View>
              ))}
            </Slick>
          )}
          {friendData && (
            <View style={[GlobalStyle.pageContainer, { paddingVertical: 0 }]}>
              <View
                style={{
                  borderBottomColor: '#0000001f',
                  borderBottomWidth: 1,
                  paddingVertical: 20,
                }}>
                <Text>
                  <Text style={styles.name}>{friendData.name},</Text>
                  <Text style={styles.age}> {friendData.age}</Text>
                </Text>
                <Text>
                  <Text style={{ marginRight: 30 }}>
                    Active this month&nbsp;&nbsp;&nbsp;&nbsp;
                    <FontAwesome name="location-arrow" style={{ marginHorizontal: 15 }} /> {nearby} km away
                  </Text>
                </Text>
              </View>
              <View style={{ paddingVertical: 20 }}>
                <Text style={styles.subTitle}>About {friendData.name}</Text>
                <Text style={styles.bioText}>{friendData.overview}</Text>
              </View>
            </View>
          )}
        </ScrollView>
        {friendData && (
          <Modal
            animationType="fade"
            transparent
            visible={this.state.makeOfferModal}
            onRequestClose={() => this.setState({ makeOfferModal: false })}>
            <View style={[GlobalStyle.overlayView, { backgroundColor: '#0000007f' }]}>
              <View style={styles.modalView}>
                <Text style={[styles.subTitle, { color: '#000000de' }]}>Make {friendData.name} an offer</Text>
                <TextField
                  label="Amount"
                  value={this.state.amount}
                  onChangeText={amount => this.setState({ amount })}
                  inputContainerPadding={20}
                  keyboardType="number-pad"
                  suffix="USD"
                />
                <ScrollView style={{ maxHeight: 80 }}>
                  <TextField
                    label="Tell her the offer details"
                    value={this.state.offerDetail}
                    onChangeText={offerDetail => this.setState({ offerDetail })}
                    multiline
                    maxLength={500}
                  />
                </ScrollView>
                <Text style={styles.maxLength}>{this.state.offerDetail.length} / 500</Text>
                <View style={styles.btnGroup}>
                  <TouchableOpacity style={styles.submitBtn} onPress={() => this.setState({ makeOfferModal: false })}>
                    <Text>CANCEL</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.submitBtn}
                    onPress={this.onSentOffer}
                    disabled={!this.state.offerDetail || !this.state.amount}>
                    <Text style={{ color: Colors.secondary }}>SEND OFFER</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        )}
        {!this.state.sent && (
          <BottomButton
            name={`Make ${friendData && friendData.name} an Offer`}
            active
            onPress={() => this.setState({ makeOfferModal: true })}
          />
        )}
        {!this.state.showNotification &&
          this.state.sent && (
            <BottomButton name="View Offer" active onPress={() => this.setState({ viewOfferModal: true })} primary />
          )}
        <Toast
          visible={showNotification}
          title={'The offer has been successfully sent'}
          onClose={() => this.setState({ showNotification: false })}
        />
        <TouchableOpacity style={{ position: 'absolute', top: 60, left: 20 }} onPress={this.goBack}>
          <Ionicons name="md-arrow-back" size={30} color="#fff" />
        </TouchableOpacity>
        {lastOffer && (
          <DetailModal
            visible={this.state.viewOfferModal}
            onClose={() => this.setState({ viewOfferModal: false })}
            imageUrl={lastOffer.girlImageUrl}
            name={lastOffer.name}
            amount={lastOffer.amount}
            letter={lastOffer.letter}
            offerTime={lastOffer.offerTime}
          />
        )}
        {this.renderLoading()}
      </View>
    );
  }
}
const mapStateToProps = state => ({
  lastOffer: state.user.lastOffer,
  gender: state.user.gender,
  offers: state.user.offers,
});
const mapDispatchToProps = dispatch => ({
  sentOffer: (friendId, amount, letter, name, girlImageUrl) =>
    dispatch(sentOffer(friendId, amount, letter, name, girlImageUrl)),
  setLoading: flag => dispatch(setLoading(flag)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MakeOffer);
