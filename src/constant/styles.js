import {StyleSheet} from 'react-native';
import Colors from './Color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const icons = StyleSheet.create({
  icon_layout: {
    width: wp(18),
    height: hp(10),
    // borderRadius: 50,
    // backgroundColor : 'red',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: Colors.primaryColor,

    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 4,
    // },
    // shadowOpacity: 0.32,
    // shadowRadius: 5.46,

    // elevation: 9,
  },
  headerBackbtn: {
    // width: 50,
    // height: 50,
    padding: 5,
    // backgroundColor : 'blue',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTxt: {
    color: Colors.secondaryColor,
  },
});

export default icons;
