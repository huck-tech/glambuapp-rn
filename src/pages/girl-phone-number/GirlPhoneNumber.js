import React from "react";
import { View, Text, Image } from "react-native";
import { connect } from "react-redux";
import DeviceInfo from "react-native-device-info";
import CountryPicker, {
  getAllCountries,
} from "react-native-country-picker-modal";
import { TextField } from "react-native-material-textfield";
import { formatIncompletePhoneNumber } from "libphonenumber-js/custom";
import metadata from "libphonenumber-js/metadata.mobile.json";

import { putNumber } from "../../actions/user";
import { GlobalStyle, Colors, Images } from "@theme";
import BottomButton from "../../components/BottomButton";
import styles from "./GirlPhoneNumber.style";
class GirlPhoneNumber extends React.PureComponent {
  constructor(props) {
    super(props);

    let userLocaleCountryCode = DeviceInfo.getDeviceCountry();
    const userCountryData = getAllCountries()
      .filter(country => country.cca2 === userLocaleCountryCode)
      .pop();
    let callingCode = null;
    let cca2 = userLocaleCountryCode;
    if (!cca2 || !userCountryData) {
      cca2 = "US";
      callingCode = "1";
    } else {
      callingCode = userCountryData.callingCode;
    }
    this.state = {
      cca2,
      callingCode,
      number: "",
    };
  }
  onNext = () => {
    const number = "+ " + this.state.callingCode + " " + this.state.number;
    this.props.putNumber(number);
  };
  changePhoneNumber = num => {
    const number = formatIncompletePhoneNumber(num, this.state.cca2, metadata);
    this.setState({ number });
  };
  render() {
    const { number, callingCode } = this.state;
    return (
      <View style={GlobalStyle.fullPageContainer}>
        <View style={GlobalStyle.pageContainer}>
          <View style={GlobalStyle.container}>
            <Text style={styles.title}>May I have your phone number?</Text>
            <View style={styles.phoneContainer}>
              <View
                style={{
                  position: "absolute",
                  bottom: 15,
                  left: 0,
                  zIndex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                }}>
                <CountryPicker
                  onChange={value => {
                    this.setState({
                      cca2: value.cca2,
                      callingCode: value.callingCode,
                      number: "",
                    });
                  }}
                  cca2={this.state.cca2}
                  translation="eng"
                />
                <Text style={{ color: "#000", fontSize: 16, paddingLeft: 10 }}>
                  +{callingCode}
                </Text>
              </View>

              <TextField
                label=""
                value={number}
                inputContainerStyle={{ paddingLeft: 80 }}
                keyboardType={"phone-pad"}
                tintColor={Colors.secondary}
                onChangeText={this.changePhoneNumber}
              />
            </View>
          </View>
          <View style={GlobalStyle.wrapper}>
            <Image source={Images.IC_COMMENTS} />
            <Text style={styles.commentText}>
              Did you know that gentlemen have extremely high extremely high
              privacy at Glambu? It&apos;s only a girl you sent a date offer to
              can view your profile!
            </Text>
          </View>
        </View>
        <BottomButton
          name="Next"
          active={number.length != 0}
          onPress={this.onNext}
        />
      </View>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  putNumber: number => dispatch(putNumber(number)),
});

export default connect(
  null,
  mapDispatchToProps,
)(GirlPhoneNumber);
