import React from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import {btnRound} from '../assets';
import { useTheme } from '@react-navigation/native';

export const CrimeButtom = (props) => {
  const {style, crimeName, crimeNumber, numberStyle, txtStyle} = props;
  const { colors } = useTheme();
  // console.log('numberStyle',numberStyle);
  // console.log('txtStyle',txtStyle);
  return (
    <View style={[styles.btnRound, style]}>
      <View style={{width: 'auto', marginRight : '6%'}}>
        <Text style = {txtStyle}>{crimeName}</Text>
      </View>
      <View
        style={{
          borderRadius: 50,
          backgroundColor: colors.subCrimeBtn,
          height: 30,
          width: 30,
          // elevation: 10,
          justifyContent: 'center',
          alignItems: 'center',
          // BOX SHADOW
          shadowColor: colors.light_dark,
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.30,
          shadowRadius: 4.65,
          
          elevation: 8,
          
        }}>
        <Text 
        style={numberStyle}
        >{crimeNumber}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  btnRound: {
    // height: '100%',
    // width: '90%',
    // backgroundColor: '#F3F7FF',
    // marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius : 10,
    borderWidth : 0.5
  },
});

export default CrimeButtom;
