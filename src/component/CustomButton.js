import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {Colors, FontSize} from '../constant';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default class CustomButton extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {btnTitle, btnHandler, btnStyle} = this.props;
    return (
      // <View
      //             style={{
      //               height: 50,
      //               width: '100%',
      //               alignItems: 'center',
      //               justifyContent: 'center',
      //             }}>

      <TouchableOpacity onPress={btnHandler} style={[styles.btn_layout, btnStyle]}>
        <Text style={[styles.btnTxt, {color: '#fff'}]}>{btnTitle}</Text>
      </TouchableOpacity>
      // </View>
    );
  }
}

const styles = StyleSheet.create({
  btn_layout: {
    width: '100%',
    height: hp('7%'),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 50,
    borderColor: Colors.secondaryColor,
    backgroundColor: Colors.secondaryColor,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 3,
    // },
    // shadowOpacity: 0.29,
    // shadowRadius: 4.65,

    elevation: 7,
  },
  btnTxt: {
    fontSize: FontSize.Medium,
  },
});
