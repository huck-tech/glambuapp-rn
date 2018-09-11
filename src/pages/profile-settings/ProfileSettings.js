import * as _ from 'lodash';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, SafeAreaView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import GridView from 'react-native-super-grid';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { LoginManager } from 'react-native-fbsdk';
import ImagePicker from 'react-native-image-picker';
import { GlobalStyle, Images, Colors } from '@theme';
import { putImageUrl, deleteImage, setLoading, logoutUser, deleteUser } from '../../actions/user';
import { storage_putImage } from '../../utils/storage';
import SettingsButton from '../../components/SettingsButton';
import { SimpleModal, ImagePickerModal } from '../../components/Modals';
import styles from './ProfileSettings.style';

const options = {
  title: 'Add Photo',
  mediaType: 'photo',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

class ProfileSettings extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      logoutConfirm: false,
      deleteConfirm: false,
      imagePick: false,
      images: Array.apply(null, Array(6)),
      photoId: null,
    };
  }
  static getDerivedStateFromProps(props) {
    if (!props.isLoading && !props.error) {
      let images = Array.apply(null, Array(6));
      for (let i = 0; i < 6; i++) {
        images[i] = props.images[i] ? _.cloneDeep(props.images[i]) : null;
      }
      return {
        images: _.cloneDeep(images),
      };
    }
    return {};
  }
  onLogout = () => {
    this.setState({ logoutConfirm: false });
    LoginManager.logOut();
    this.props.logoutUser();
    this.props.navigation.popToTop();
  };
  onDelete = () => {
    this.setState({ deleteConfirm: false });
    LoginManager.logOut();
    this.props.deleteUser();
  };

  onUploadImage(id) {
    if (this.state.images[id]) {
      this.props.deleteImage(id);
    } else {
      this.setState({
        photoId: id,
        imagePick: true,
      });
    }
  }
  onLibrary = () => {
    ImagePicker.launchImageLibrary(options, res => {
      this.props.setLoading(true);
      this.setState({ imagePick: false });
      storage_putImage(this.props.userId, res.fileName, res.path).then(res => {
        this.props.putImageUrl(this.state.photoId, res.downloadURL, res.ref);
      });
    });
  };
  onCamera = () => {
    ImagePicker.launchCamera(options, res => {
      this.props.setLoading(true);
      this.setState({ imagePick: false, isLoading: true });
      storage_putImage(this.props.userId, res.fileName, res.path).then(res => {
        this.props.putImageUrl(this.state.photoId, res.downloadURL, res.ref);
      });
    });
  };

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
    const { logoutConfirm, deleteConfirm, imagePick, images } = this.state;
    return (
      <SafeAreaView style={GlobalStyle.fullPageContainer}>
        <ScrollView style={GlobalStyle.fullPageContainer}>
          <View style={{ paddingVertical: 20 }}>
            <Text style={{ paddingHorizontal: 20 }}>PHOTOS</Text>
            <GridView
              itemDimension={90}
              items={images}
              style={styles.gridView}
              renderItem={(item, index) => (
                <View style={styles.itemContainer}>
                  {item && item.imageUrl && <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />}
                  <TouchableOpacity style={styles.action} onPress={() => this.onUploadImage(index)}>
                    <Icon name={item ? 'close' : 'plus'} size={20} color="#fff" />
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
          <View>
            <Text style={{ paddingHorizontal: 20 }}>PROFILE</Text>
            <View style={{ borderTopWidth: 1, borderTopColor: '#d6d7da' }} />
            <SettingsButton
              text="Profile settings"
              subTitle="Set your nickname and profile information"
              onPress={() => this.props.navigation.navigate('ChangeSettings')}
            />
            <SettingsButton text="View my profile" onPress={() => this.props.navigation.navigate('ViewProfile')} />
            <SettingsButton text="Log out" onPress={() => this.setState({ logoutConfirm: true })} />
            <SettingsButton text="Delete my profile" primary onPress={() => this.setState({ deleteConfirm: true })} />
          </View>
          <View style={{ paddingVertical: 40, alignItems: 'center' }}>
            <Image source={Images.IC_LOGO_TEXT1} style={styles.logo} />
            <Text
              style={{
                textAlign: 'center',
                paddingTop: 15,
                fontSize: 12,
                color: '#0000003d',
              }}>
              2018 &#169; Glambu app. All Rights reserved.{'\n'}v. 1.0.0.1
            </Text>
          </View>
        </ScrollView>
        <SimpleModal
          visible={logoutConfirm}
          onConfirm={this.onLogout}
          onClose={() => this.setState({ logoutConfirm: false })}
          title="Are you sure you want to logout?"
          description="By logging out, you will not receive notifications about sent offers"
          cancelText="CANCEL"
          confirmText="LOG OUT"
        />
        <SimpleModal
          visible={deleteConfirm}
          onConfirm={this.onDelete}
          onClose={() => this.setState({ deleteConfirm: false })}
          title="Delete this profile?"
          description="You'll lose all photos and media"
          cancelText="CANCEL"
          confirmText="DELETE"
        />
        <ImagePickerModal
          visible={imagePick}
          onClose={() => this.setState({ imagePick: false })}
          onCamera={() => this.onCamera()}
          onLibrary={() => this.onLibrary()}
        />
        {this.renderLoading()}
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => ({
  userId: state.user.userId,
  images: state.user.profileImages,
  isLoading: state.user.isLoading,
});
const mapDispatchToProps = dispatch => ({
  putImageUrl: (index, imageUrl, imageRef) => dispatch(putImageUrl(index, imageUrl, imageRef)),
  deleteImage: index => dispatch(deleteImage(index)),
  setLoading: flag => dispatch(setLoading(flag)),
  logoutUser: () => dispatch(logoutUser()),
  deleteUser: () => dispatch(deleteUser()),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileSettings);
