import React from "react";
import PropTypes from "prop-types";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { View, Text } from "react-native";

import styles from "./FBLoginView.style";

export default class FBLoginView extends React.PureComponent {
  static contextTypes = {
    isLoggedIn: PropTypes.bool,
    login: PropTypes.func,
    logout: PropTypes.func,
    props: PropTypes.shape({}),
  };
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <FontAwesome name="facebook-square" color="#fff" size={30} />
        <Text style={styles.btnText}>Login with Facebook</Text>
      </View>
    );
  }
}
