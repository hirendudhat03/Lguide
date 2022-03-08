import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { Colors } from '../constant'

const Forbidden = (props) => {
    const { handleCheckLocation } = props
  return (
    <View style={styles.container}>
      <Text>Please Turn On Device GPS Or Location</Text>
      <TouchableOpacity onPress = {handleCheckLocation} style={styles.btn}>
        <Text style = {styles.btnTxt}>Refresh</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Forbidden;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: Colors.secondaryColor,
    width: 160,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 25,
    flexDirection : 'row',
    borderRadius : 25
  },
  btnTxt : {
    color :  Colors.white_color
  }
});
