import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {LG_logo, Welcome_bg, Right_arrow} from '../../assets';
import {FontSize, Colors} from '../../constant';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

class Welcome extends Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: Colors.white_color}}>
        <View style={styles.top}>
          <View style={styles.logoLayout}>
            <Image source={LG_logo} />
          </View>
          <View style={styles.txtLayout}>
            <Text style={styles.title}>find the</Text>
            <Text style={styles.title}>safest and</Text>
            <Text style={styles.title}>accurate</Text>
            <Text style={styles.title}>location</Text>
          </View>
          <View style={[styles.txtLayout, {marginTop: 15}]}>
            <Text style={styles.subTitle}>
              Set exact location to find the your current position.
            </Text>
          </View>
        </View>
        <View style={styles.bottom}>
          <ImageBackground
            resizeMode="stretch"
            source={Welcome_bg}
            style={styles.bgImg}>
            <TouchableOpacity
              style={styles.btnLayout}
              onPress={() => this.props.navigation.navigate('Login')}>
              <Text style={styles.btnTxt}>Let’s get stated</Text>
              <Image
                source={Right_arrow}
                resizeMode="contain"
                style={{height: '40%'}}
              />
            </TouchableOpacity>
          </ImageBackground>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  top: {
    flex: 2,
    justifyContent: 'space-evenly',
    // backgroundColor : 'red'
  },
  bottom: {
    flex: 1.5,
    width: wp(100),
    height: '100%',
    // backgroundColor : 'yellow'
  },
  logoLayout: {
    alignSelf: 'center',
    marginTop: 35,
  },
  txtLayout: {
    // backgroundColor : 'blue',
    // paddingLeft : 48,
    paddingHorizontal: 40,
    marginTop: 30,
  },
  title: {
    fontSize: FontSize.extraLarge + 6,
    textTransform: 'uppercase',
    fontWeight: '900',
  },
  subTitle: {
    fontSize: FontSize.Medium + 2,
    color: Colors.secondaryColor,
    fontWeight: '900',
  },
  bgImg: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnLayout: {
    width: '75%',
    height: 50,
    backgroundColor: Colors.white_color,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    marginBottom: 25,
  },
  btnTxt: {
    color: Colors.secondaryColor,
    fontSize: FontSize.Regular + 3,
  },
});

export default Welcome;
