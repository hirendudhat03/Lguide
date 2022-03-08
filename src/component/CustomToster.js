import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {Icon} from 'native-base';
import {useSelector, useDispatch} from 'react-redux';
import {Colors, FontSize} from '../constant';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {error} from '../assets';

const CustomToster = (props) => {
  const [showToster, setShowToster] = useState(false);

  let commonState = useSelector((state) => {
    return state.Common;
  });
  const dispatch = useDispatch();

  const showHandler = () => {
    dispatch({type: 'UPDATE_TOSTER_FLAG'});
    const {property} = commonState;
    if (Object.keys(property).length !== 0) {
      property.navigation.navigate('Notification');
    }
  };

  console.log('commonState in notification', commonState);
  if (commonState.tosterFlag === true) {
    setTimeout(() => {
      dispatch({type: 'UPDATE_TOSTER_FLAG'});
    }, 5000);
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={[styles.column, {width: '15%'}]}>
            <Image source={error} style={{width: '60%', height: '60%'}} />
          </View>
          <View style={[styles.column, {width: '70%'}]}>
            <Text style={styles.txtStyle}>
              01 crime1 crime has been reported near your area, please confirm
            </Text>
          </View>
          <TouchableOpacity
            onPress={showHandler}
            style={[
              styles.column,
              {width: '15%', borderLeftWidth: 0.8, borderLeftColor: 'gray'},
            ]}>
            <Text style={styles.btnTxt}>Show</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    return null;
  }
  //   return null
};

export default CustomToster;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(31, 49, 74, 0.75)',
    position: 'absolute',
    bottom: 140,
    alignSelf: 'center',
    width: wp(90),
    height: hp(8),
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: '#F93963',
  },
  row: {
    height: '100%',
    width: '100%',
    // backgroundColor : 'red',
    borderRadius: 30,
    flexDirection: 'row',
  },
  txtStyle: {
    color: '#fff',
  },
  btnTxt: {
    color: '#fff',
  },
  column: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
