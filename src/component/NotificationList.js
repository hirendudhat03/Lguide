import React from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {TextInput} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {error, justNow, verifySwipe, deleteSwipe} from '../assets';
import {Colors} from '../constant';
import { Icon } from 'native-base'

const SCREEN_WIDTH = Dimensions.get('window').width;

export const NotificationList = (props) => {
  const leftSwipe = () => {
    return (
      <View style={styles.verifybox}>
        <Image 
          source={verifySwipe}
          style={styles.image3}
        />
      </View>
    );
  };
  const rightSwipe = () => {
    return (
      <View style={styles.deletbox}>
        <Image 
          source={deleteSwipe}
          style={styles.image3}
        />
      </View>
    );
  };
  const {Text1, Text2, time} = props;
  return (
    <Swipeable 
      renderLeftActions={leftSwipe}
      renderRightActions={rightSwipe}
    >
      <View style={styles.NotificationView}>
        <View style={styles.iconView}>
          <Image source={error} style={styles.image} />
        </View>
        <View style={styles.textView}>
          <Text style={styles.firstText}>{Text1}</Text>
          <Text style={styles.secondText}>{Text2}</Text>
          <View style = {styles.row}>
            <Icon type = 'MaterialIcons' name = 'access-time' style = {{fontSize : 16, color : 'gray'}} />
            <Text style = {styles.time}>{time}</Text>
          </View>
          {/* <Image source={justNow} style={styles.image1} /> */}
        </View>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  NotificationView: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 10,
    height: hp('14.00%'),
    backgroundColor: '#F3F7FF',
    marginTop: 20,
  },
  iconView: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textView: {
    width: '80%',
  },
  image: {
    height: hp('10.00%'),
    width: wp('10.00%'),
    resizeMode: 'contain',
  },
  image1: {
    height: hp('3.00%'),
    width: wp('18.00%'),
    resizeMode: 'contain',
  },
  image3: {
    height: hp('15.00%'),
    width: wp('20.00%'),
    resizeMode: 'contain',
  },
  firstText: {
    color: Colors.txtColor,
    fontSize: wp('4.8%'),
    fontWeight: 'bold',
  },
  secondText: {
    color: Colors.txtColor,
    fontSize: wp('3.5%'),
  },
  verifybox: {
    backgroundColor: '#64DEA8',
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('14.00%'),
    marginTop: 20,
    width: 100,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10
  },
  deletbox: {
    backgroundColor: '#E74A69',
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('14.00%'),
    marginTop: 20,
    width: 100,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10
  },
  row : {
    flexDirection : 'row',
    height : 25,
    // backgroundColor : 'red',
    alignItems : 'center'
  },
  time : {
    marginLeft : 2,
    color : 'gray'
    // fontSize : 12
  }
});

export default NotificationList;
