import React from 'react';
import { View, Image, ActivityIndicator } from 'react-native';
import { GlobalStyle, Colors } from '@theme';
export default class AsyncImage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  render() {
    const { style, uri } = this.props;
    return (
      <View style={[style, { position: 'relative' }]}>
        <Image
          style={{ width: '100%', height: '100%' }}
          source={{ uri: uri }}
          resizeMode={'contain'}
          onLoadStart={() => this.setState({ loading: true })}
          onLoadEnd={() => this.setState({ loading: false })}
        />
        {this.state.loading && (
          <View style={[GlobalStyle.overlayView, style]}>
            <ActivityIndicator size="small" color={Colors.secondary} />
          </View>
        )}
      </View>
    );
  }
}
