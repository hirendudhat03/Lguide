import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {TextInputs, CustomButton} from '../../component';
import {LG_logo, google} from '../../assets';
import {Colors, FontSize} from '../../constant';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-community/async-storage';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iconName: 'eye',
      secureTextEntry: true,
      cPassIconName: 'eye',
      cpassSecureTextEntry: true,
    };
  }
  passwordShowHandler = () => {
    this.setState((prevState, props) => ({
      iconName: prevState.iconName === 'eye' ? 'eye-with-line' : 'eye',
      secureTextEntry: !this.state.secureTextEntry,
    }));
  };
  cPasswordShowHandler = () => {
    this.setState((prevState, props) => ({
      cPassIconName:
        prevState.cPassIconName === 'eye' ? 'eye-with-line' : 'eye',
      cpassSecureTextEntry: !this.state.cpassSecureTextEntry,
    }));
  };

  skipHandler = () => {
    AsyncStorage.setItem('skipAuth', JSON.stringify({isSkipAuthentication : true}));
    this.props.navigation.navigate('DrawerNavigation')
  }

  render() {
    const {
      iconName,
      secureTextEntry,
      cPassIconName,
      cpassSecureTextEntry,
    } = this.state;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: Colors.white_color}}>
        <KeyboardAwareScrollView
          contentContainerStyle={{height: 'auto'}}
          enableAutomaticScroll={true}>
          <View style={styles.layout}>
            <View style={styles.logoLayout}>
              <Image source={LG_logo} />
            </View>
            <View style={styles.frm}>
              <Text style={styles.title}>Signup for account</Text>
              <TextInputs placeholder="Email or username" iconShow={false} />
              <TextInputs
                secureTextEntry={secureTextEntry}
                placeholder="Password"
                iconShow={true}
                iconName={iconName}
                passwordShowHandler={this.passwordShowHandler}
              />
              <TextInputs
                secureTextEntry={cpassSecureTextEntry}
                placeholder="Confirm Password"
                iconShow={true}
                iconName={cPassIconName}
                passwordShowHandler={this.cPasswordShowHandler}
              />
              <View style={styles.btnLayout}>
                <CustomButton btnHandler = {() => this.props.navigation.navigate('IntroScreen')} btnTitle="SIGN UP" />
              </View>
            </View>
            <Text style={styles.or}>OR</Text>
            <View style={styles.bottom}>
              <TouchableOpacity style={styles.googleBtn}>
              <Image source = {google} resizeMode = 'contain' style = {{height : '42%', width : '10%'}} />
                <Text style={styles.googleTxt}>Connect with Google</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress = {this.skipHandler} style = {{alignSelf : 'center', marginTop : 30}}>
                <Text style = {[styles.googleTxt, { fontSize : FontSize.Medium}]}>Skip</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  layout: {
    width: wp(90),
    alignSelf: 'center',
    justifyContent: 'space-around',
    // backgroundColor : 'red',
    flex: 1,
  },
  logoLayout: {
    alignSelf: 'center',
    marginVertical: 45,
    // width : wp(40),
    // height : hp(8),
    // backgroundColor : 'red',
    // justifyContent : 'center',
    // alignItems : 'center'
  },
  frm: {
    //   backgroundColor : 'yellow',
    //   alignItems : 'center',
    padding: 5,
    width: '90%',
    alignSelf: 'center',
    // flex : 1
  },
  title: {
    fontSize: FontSize.Large + 2,
    color: Colors.txtColor,
    alignSelf: 'center',
    marginBottom: 35,
  },
  forget: {
    fontSize: FontSize.Regular,
    color: '#4FACFE',
  },
  btnLayout: {
    marginTop: 20,
  },
  or: {
    fontSize: FontSize.Regular - 2,
    alignSelf: 'center',
    marginVertical: 30,
    color: '#6780B2',
  },
  bottom: {
    padding: 5,
    width: '90%',
    alignSelf: 'center',
    marginBottom: 60,
  },
  googleBtn: {
    width: '100%',
    height: hp(7),
    //   backgroundsColor :'red',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.secondaryColor,
    justifyContent: 'space-evenly',
    flexDirection : 'row',
    alignItems: 'center',
  },
  googleTxt: {
    fontSize: FontSize.Regular,
    color: Colors.txtColor,
  },
  row: {
    flexDirection: 'row',
  },
  txtLayout: {
    alignSelf: 'center',
    marginTop: 30,
    alignItems: 'center',
  },
  txt: {
    fontSize: FontSize.Medium - 4,
    color: Colors.txtColor,
  },
});

export default Signup;
