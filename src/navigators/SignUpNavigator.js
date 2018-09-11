import { createStackNavigator } from "react-navigation";
import { NameScreen, UploadImages, BioScreen, GirlPhoneNumber } from "../pages";

const SignUpNavigator = createStackNavigator(
  {
    NameScreen: { screen: NameScreen },
    UploadImages: { screen: UploadImages },
    BioScreen: { screen: BioScreen },
    PhoneNumberScreen: { screen: GirlPhoneNumber },
  },
  {
    initialRouteName: "NameScreen",
    navigationOptions: {
      header: null,
    },
  },
);
export default SignUpNavigator;
