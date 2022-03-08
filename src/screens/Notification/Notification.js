import React, { useEffect } from 'react';
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  FlatList,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {NotificationHeader, NotificationList} from '../../component';
import AsyncStorage from '@react-native-community/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment'

const notificationText = [
  {
    value1: '01 new crime registered',
    value2:
      'New crime has been resistered in your near area, please check and confirm',
  },
  {
    value1: '02 new crime registered',
    value2:
      'New crime has been resistered in your near area, please check and confirm',
  },
  {
    value1: '03 new crime registered',
    value2:
      'New crime has been resistered in your near area, please check and confirm',
  },
  {
    value1: '04 new crime registered',
    value2:
      'New crime has been resistered in your near area, please check and confirm',
  },
  {
    value1: '05 new crime registered',
    value2:
      'New crime has been resistered in your near area, please check and confirm',
  },
  {
    value1: '06 new crime registered',
    value2:
      'New crime has been resistered in your near area, please check and confirm',
  },
  {
    value1: '07 new crime registered',
    value2:
      'New crime has been resistered in your near area, please check and confirm',
  },
  {
    value1: '08 new crime registered',
    value2:
      'New crime has been resistered in your near area, please check and confirm',
  },
  {
    value1: '09 new crime registered',
    value2:
      'New crime has been resistered in your near area, please check and confirm',
  },
  {
    value1: '10 new crime registered',
    value2:
      'New crime has been resistered in your near area, please check and confirm',
  },
];

const Notification = (props) => {

  let commonState = useSelector((state) => {
    return state.Common;
  });

  useEffect(() => {
    getValueFromAsyncStorage()
  }, [])

  const getValueFromAsyncStorage = async() => {
      let user = await AsyncStorage.getItem('guestUser');
      console.log('user',user); 
  }

  console.log('commonState in notification',commonState.notificationArr);
  return (
    <>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.mainView}>
            <View style={styles.middleView}>
              <NotificationHeader
                fname={'Recent notification'}
                middleName={'Clear all'}
              />
            </View>
            <View style={[styles.middleView]}>
              <FlatList
                data={commonState.notificationArr}
                renderItem={({item}) => {
                  // console.log('TIME',moment(item.sentTime).format('DD-MM-YYYY'));
                  return (
                    <NotificationList Text1={item.notification.title} Text2={item.notification.body} time = {moment(item.sentTime).format('DD-MM-YYYY')} />
                  );
                }}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainView: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  middleView: {
    width: '90%',
  },
});

export default Notification;
