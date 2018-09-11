import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import ImagePicker from 'react-native-image-picker';
import { storage_putImage } from '../../utils/storage';
import BottomButton from '../../components/BottomButton';
import { ImagePickerModal } from '../../components/Modals';
import { putImageUrl, deleteImage, setLoading } from '../../actions/user';
import GridView from 'react-native-super-grid';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { GlobalStyle, Images, Colors } from '@theme';
import styles from './UploadImages.style';
const options = {
  title: 'Add Photo',
  mediaType: 'photo',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

class UploadImages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleSheet: false,
      photoId: null,
      images: Array.apply(null, Array(6)),
      isLoading: false,
    };
  }
  static getDerivedStateFromProps(props) {
    if (!props.isLoading && !props.error) {
      return {
        images: props.images,
      };
    }
    return {};
  }
  onNext = () => {
    const navigateAction = NavigationActions.navigate({
      routeName: 'BioScreen',
    });
    this.props.navigation.dispatch(navigateAction);
  };
  onUploadImage(id) {
    if (this.state.images[id]) {
      this.props.deleteImage(id);
    } else {
      this.setState({
        photoId: id,
        visibleSheet: true,
      });
    }
  }
  onLibrary = () => {
    ImagePicker.launchImageLibrary(options, res => {
      this.props.setLoading(true);
      this.setState({ visibleSheet: false });
      storage_putImage(this.props.userId, res.fileName, res.path).then(res => {
        this.props.putImageUrl(this.state.photoId, res.downloadURL, res.ref);
      });
    });
  };
  onCamera = () => {
    ImagePicker.launchCamera(options, res => {
      this.props.setLoading(true);
      this.setState({ visibleSheet: false, isLoading: true });
      storage_putImage(this.props.userId, res.fileName, res.path).then(res => {
        this.props.putImageUrl(this.state.photoId, res.downloadURL, res.ref);
      });
    });
  };
  renderLoading() {
    if (this.props.isLoading) {
      return (
        <View
          style={[
            GlobalStyle.overlayView,
            { backgroundColor: Colors.bkColorOpacity },
          ]}>
          <ActivityIndicator size="large" color={Colors.secondary} />
        </View>
      );
    }
  }

  render() {
    const { visibleSheet } = this.state;
    const { name, gender } = this.props;
    return (
      <View style={GlobalStyle.fullPageContainer}>
        <View style={GlobalStyle.pageContainer}>
          <View style={GlobalStyle.container}>
            <Text style={styles.title}>Nice to meet you {name} :-)</Text>
            <Text style={styles.desc}>
              Now, I need you to upload some pictures of you. You can edit or
              delete the picture anytime.
            </Text>
            <GridView
              itemDimension={90}
              items={this.state.images}
              style={styles.gridView}
              renderItem={(item, index) => (
                <View style={styles.itemContainer}>
                  {item &&
                    item.imageUrl && (
                      <Image
                        source={{ uri: item.imageUrl }}
                        style={styles.itemImage}
                      />
                    )}
                  <TouchableOpacity
                    style={styles.action}
                    onPress={() => this.onUploadImage(index)}>
                    <Icon
                      name={item ? 'close' : 'plus'}
                      size={20}
                      color="#fff"
                    />
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
          <View style={GlobalStyle.wrapper}>
            <Image source={Images.IC_COMMENTS} />
            <Text style={styles.commentText}>
              The most appropriate profiles should contain full-body pictures a
              nice smile, clean and visible pictures.
            </Text>
          </View>
        </View>
        <BottomButton
          name={gender === 'male' ? 'Go to final step' : 'Next'}
          active
          onPress={this.onNext}
        />
        <ImagePickerModal
          visible={visibleSheet}
          onClose={() => this.setState({ visibleSheet: false })}
          onCamera={() => this.onCamera()}
          onLibrary={() => this.onLibrary()}
        />
        {this.renderLoading()}
      </View>
    );
  }
}
const mapStateToProps = state => ({
  userId: state.user.userId,
  name: state.user.name,
  images: state.user.profileImages,
  isLoading: state.user.isLoading,
  error: state.user.error,
  gender: state.user.gender,
});
const mapDispatchToProps = dispatch => ({
  putImageUrl: (index, imageUrl, imageRef) =>
    dispatch(putImageUrl(index, imageUrl, imageRef)),
  deleteImage: index => dispatch(deleteImage(index)),
  setLoading: flag => dispatch(setLoading(flag)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UploadImages);
