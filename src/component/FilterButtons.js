import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Colors, FontSize} from '../constant';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';


const FilterButtons = (props) => {
  const {btnTitle, btnHandler, btnStyle, txtStyle} = props;
  return (
    <TouchableOpacity
      onPress={btnHandler}
      style={[styles.btn_layout, btnStyle]}>
      <Text style={[styles.btnText, txtStyle]}>{btnTitle}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn_layout: {
    height: hp('7%'),
    borderRadius: 50,
    borderColor: Colors.secondaryColor,
    backgroundColor: Colors.secondaryColor,
    elevation: 7,
    justifyContent: 'center',
    alignItems: 'center',
    // padding : 5
    // paddingHorizontal : 35,
    // paddingVertical : 10
    
  },
  btnText: {
    color: Colors.white_color,
    fontSize: FontSize.Regular - 1,
    // textAlign : 'center'
    // marginHorizontal : 35,
    // marginVertical : 15
  },
});

export default FilterButtons;
