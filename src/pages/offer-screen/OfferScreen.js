import React from 'react';
import _ from 'lodash';
import { View, Text, SafeAreaView, Image, ScrollView, ActivityIndicator } from 'react-native';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import { GlobalStyle, Images, Colors } from '@theme';
import OfferCard from '../../components/OfferCard';
import Toast from '../../components/Toast';
import { ActionModal, AcceptedModal, DetailModal, NewModal, RejectedModal } from '../../components/Modals';
import styles from './Offerscreen.style';
import { db_getAllOffers } from '../../utils/globalFuctions';
import { db_changeOffer } from '../../utils/firebase';
import { requestNotificationPermission } from '../../utils/notification';

const EmptyOffer = ({ gender }) => (
  <SafeAreaView style={GlobalStyle.fullPageContainer}>
    <View style={[GlobalStyle.container, { alignItems: 'center' }]}>
      <Image source={Images.IC_EMPTY} style={styles.emptyIcon} resizeMode="contain" />
      <Text style={styles.emptyOfferDescription}>
        {gender === 'male'
          ? `You didn't make any offer yet.${'\n'}Don't loose time. Make a date offer today!`
          : `You don't have any offers yet :-(${'\n'}Stay patient, I am sure somebody would invite you as soon as possible`}
      </Text>
    </View>
  </SafeAreaView>
);
class OfferScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      offerList: null,
      visibleAction: false,
      visibleAccepted: false,
      visibleDetail: false,
      visibleNew: false,
      visibleReject: false,
      selectedOfferIndex: 0,
      notifData: null,
      isLoading: false,
      showNotification: false,
      notificationTitle: '',
    };
  }
  async componentDidMount() {
    this.getOffers();
    const permission = await requestNotificationPermission();
    if (permission) {
      this.notificationListener = firebase.notifications().onNotification(notification => {
        console.log('-----', notification);
        this.getOffers();
      });
      // this.notificationDisplayedListener = firebase
      //   .notifications()
      //   .onNotificationDisplayed(notification => {
      //     console.log('====', notification);
      //     // Process your notification as required
      //     // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
      //   });
      // this.messageListener = firebase.messaging().onMessage(message => {
      //   console.log('--------- message', message);
      // });
      this.notificationOpenedListener = firebase.notifications().onNotificationOpened(notificationOpen => {
        // Get the action triggered by the notification being opened
        // const action = notificationOpen.action;
        // Get information about the notification that was opened
        // const notification: Notification = notificationOpen.notification;
        console.log('--------- open', notificationOpen);
        this.getOffers();
      });
    }
  }

  componentWillUnmount() {
    this.notificationListener();
    // this.notificationDisplayedListener();
    // this.messageListener();
    this.notificationOpenedListener();
  }
  onCall = (type, number) => {
    console.log(type, number); //eslint-disable-line
    this.setState({ visibleAction: true });
  };
  onDetail = index => {
    const status = this.state.offerList[index].status;
    switch (status) {
      case 'PENDING':
        if (this.props.gender === 'female') {
          this.setState({ selectedOfferIndex: index, visibleNew: true });
        } else {
          this.setState({ selectedOfferIndex: index, visibleDetail: true });
        }
        break;
      default:
        this.setState({ selectedOfferIndex: index, visibleDetail: true });
    }
  };

  renderLoading() {
    if (this.state.isLoading) {
      return (
        <View style={[GlobalStyle.overlayView, { backgroundColor: Colors.bkColorOpacity }]}>
          <ActivityIndicator size="large" color={Colors.secondary} />
        </View>
      );
    }
  }

  getOffers() {
    this.setState({ isLoading: true });
    db_getAllOffers(this.props.userId, this.props.gender).then(list => {
      this.setState({ offerList: list, isLoading: false });
    });
  }
  onConfirm = title => {
    if (title === 'ACCEPTED') {
      const selectedOffer = this.props.offers[this.state.selectedOfferIndex];
      this.setState({ isLoading: true });
      db_changeOffer(selectedOffer, title)
        .then(() => {
          this.setState({
            visibleNew: false,
            showNotification: true,
            notificationTitle: 'The offer has been successfully accepted',
            isLoading: false,
          });
          this.getOffers();
          setTimeout(() => {
            this.setState({ showNotification: false });
          }, 1000);
        })
        .catch(e => console.warn(e));
    } else {
      this.setState({ visibleNew: false, visibleReject: true });
    }
  };
  onReject = reason => {
    const selectedOffer = this.props.offers[this.state.selectedOfferIndex];
    console.log(this.state.selectedOfferIndex);
    this.setState({ isLoading: true });
    db_changeOffer(selectedOffer, 'REJECTED', reason)
      .then(() => {
        this.setState({
          visibleReject: false,
          showNotification: true,
          notificationTitle: 'The offer has been successfully rejected',
          isLoading: false,
        });
        this.getOffers();
        setTimeout(() => {
          this.setState({ showNotification: false });
        }, 1000);
      })
      .catch(e => console.warn(e));
  };

  render() {
    const {
      visibleAccepted,
      visibleAction,
      visibleDetail,
      selectedOfferIndex,
      offerList,
      visibleNew,
      visibleReject,
    } = this.state;
    const { gender } = this.props;
    if (_.isEmpty(offerList)) {
      return <EmptyOffer gender={this.props.gender} />;
    } else {
      const imageUrl =
        gender === 'male' ? offerList[selectedOfferIndex].girlImageUrl : offerList[selectedOfferIndex].boyImageUrl;
      return (
        <SafeAreaView style={[GlobalStyle.fullPageContainer, { paddingHorizontal: 5 }]}>
          <ActionModal visible={visibleAction} onClose={() => this.setState({ visibleAction: false })} />
          <AcceptedModal
            visible={visibleAccepted}
            onClose={() => this.setState({ visibleAccepted: false })}
            onCall={this.onCall}
            onDetail={() => this.setState({ visibleDetail: true })}
          />
          <DetailModal
            visible={visibleDetail}
            imageUrl={imageUrl}
            name={offerList[selectedOfferIndex].name}
            amount={offerList[selectedOfferIndex].amount}
            letter={offerList[selectedOfferIndex].letter}
            offerTime={offerList[selectedOfferIndex].offerTime}
            onClose={() => this.setState({ visibleDetail: false })}
            isReject={gender === 'male' && offerList[selectedOfferIndex].status === 'PENDING'}
            onReject={this.onReject}
          />
          <RejectedModal
            visible={visibleReject}
            name={offerList[selectedOfferIndex].boyName}
            onClose={() => this.setState({ visibleReject: false })}
            onReject={this.onReject}
          />
          <NewModal
            visible={visibleNew}
            imageUrl={imageUrl}
            name={offerList[selectedOfferIndex].name}
            amount={offerList[selectedOfferIndex].amount}
            letter={offerList[selectedOfferIndex].letter}
            offerTime={offerList[selectedOfferIndex].offerTime}
            onClose={() => this.setState({ visibleNew: false })}
            onConfirm={this.onConfirm}
            loading={this.state.isLoading}
          />
          <Toast
            visible={this.state.showNotification}
            title={this.state.notificationTitle}
            onClose={() => this.setState({ showNotification: false })}
          />
          <ScrollView contentContainerStyle={{ paddingBottom: 10 }}>
            {offerList.map(
              (offer, i) =>
                offer.status === 'REJECTED' &&
                offer.reason !== 'CANCELED' && (
                  <OfferCard
                    key={i}
                    {...offer}
                    onCall={this.onCall}
                    gender={gender}
                    onDetail={() => this.onDetail(i)}
                  />
                ),
            )}
          </ScrollView>
          {this.renderLoading()}
        </SafeAreaView>
      );
    }
  }
}
const mapStateToProps = state => ({
  userId: state.user.userId,
  gender: state.user.gender,
  offers: state.user.offers,
});
export default connect(mapStateToProps)(OfferScreen);
