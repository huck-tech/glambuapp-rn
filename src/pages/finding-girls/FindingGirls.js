import React from 'react';
import { View, Text, ScrollView, ActivityIndicator, Image } from 'react-native';
import Masonry from 'react-native-masonry';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { GlobalStyle, Colors } from '@theme';
import { getMasonryData, getDistance } from '../../utils/globalFuctions';
import styles from './FindingGirls.style';

const MasonryHeader = props => (
  <View style={styles.masonryHeader}>
    <Text style={{ color: '#fff' }}>
      <FontAwesome name="location-arrow" color="#fff" style={{ marginRight: 15 }} />
      &nbsp;&nbsp;{props.nearby} km
    </Text>
  </View>
);

const MasonryFooter = props => (
  <View style={styles.masonryFooter}>
    <Text style={{ color: '#fff', fontSize: 16 }}>
      {props.name}, {props.age}
    </Text>
  </View>
);

const MemberPhoto = props => {
  return (
    <View style={{ position: 'relative', marginBottom: 20 }}>
      <Image {...props} />
      <LinearGradient
        colors={['#0000001f', '#00000000', '#00000000', '#00000000', '#00000000', '#0000001f']}
        style={styles.linearGradient}
      />
    </View>
  );
};

class FindingGirls extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      columns: 0,
    };
  }

  componentDidMount() {
    getMasonryData(this.props.gender).then(response => {
      const bricks = response.map(this.addParams);
      this.setState({ loading: false, columns: 2, bricks });
    });
  }

  addParams = item => {
    item.data.nearby = getDistance(item.data.location, this.props.location);
    item.onPress = () =>
      this.props.navigation.navigate('MakeOffer', { userId: item.data.userId, nearby: item.data.nearby });
    item.renderHeader = MasonryHeader;
    item.renderFooter = MasonryFooter;
    return item;
  };

  render() {
    return (
      <View style={GlobalStyle.fullPageContainer}>
        <ScrollView contentContainerStyle={[GlobalStyle.pageContainer, { paddingVertical: 20 }]}>
          <Masonry
            sorted // optional - Default: false
            columns={this.state.columns} // optional - Default: 2
            bricks={this.state.bricks}
            imageContainerStyle={{ marginTop: 0, borderRadius: 5 }}
            customImageComponent={MemberPhoto}
            customImageProps={{
              onDetail: () => this.props.navigation.navigate('FindGirlScreen'),
            }}
            spacing={5}
          />
        </ScrollView>
        {this.state.loading && (
          <View style={GlobalStyle.overlayView}>
            <ActivityIndicator size="large" color={Colors.secondary} />
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  gender: state.user.gender,
  location: state.user.location,
});

export default connect(mapStateToProps)(FindingGirls);
