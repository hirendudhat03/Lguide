import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';
import Navigation from '../navigation/Navigation';
import {useSelector, useDispatch} from 'react-redux';
// import Geolocation from '@react-native-community/geolocation';
import Geolocation from 'react-native-geolocation-service';

import {Loader, CustomToster} from '../component';
import {
  createGuestUser,
  updateGuestUser,
} from '../Redux/Action/guestUser.action';
import AsyncStorage from '@react-native-community/async-storage';
import {Forbidden} from '../component';
import messaging from '@react-native-firebase/messaging';



const Startup = (props) => {
  const dispatch = useDispatch();

  const [currentLat, setCurrentLate] = useState();
  const [currentLong, setCurrentLong] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isLocation, setIsLocation] = useState(true);
  useEffect(() => {
    
    getPermission();
    // FOR NOTIFICATION
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      console.log('A new FCM message arrived! in STARTUP SCREEN', remoteMessage);
    });
    return unsubscribe;
    // createGuestUser()
  }, []);

  const handleCheckLocation = () => {
    console.log('dfsdfsfsdf');
    setIsLoading(true);
    getPermission();
  };

  const getPermission = () => {
    console.log("getPermission")
    //Checking for the permission just after component loaded
    if (Platform.OS === 'ios') {
      callLocation();
    } else {
      async function requestLocationPermission() {
        try {
          console.log("getPermission requestLocationPermission")
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'LGuide needs to Access your location',
            },
          );
          console.log("getPermission granted",granted)
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("getPermission PermissionsAndroid.RESULTS.GRANTED",granted)
            //To Check, If Permission is granted
            callLocation();
          } else {
            alert('Permission Denied');
          }
        } catch (err) {
          console.log(err);
          alert('err', err);
          // console.warn(err)
        }
      }
      requestLocationPermission();
    }
  };

  const callLocation = () => {
    console.log("getPermission callLocation")
    //alert("callLocation Called");
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        console.log("getPermission position",position)
        const currentLongitude = JSON.stringify(position.coords.longitude);
        //getting the Longitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
        //getting the Latitude from the location json
        setCurrentLate(currentLatitude);
        setCurrentLong(currentLongitude);
        setIsLoading(false);
        setIsLocation(true);
        const Obj = {
          currentLatitude,
          currentLongitude,
        };
        console.log('WORKING');
        if (currentLatitude && currentLongitude) {
          console.log("getPermission Obj",Obj)
          callcreateGuestUser(Obj);
          dispatch({
            type: 'GET_CURRENT_LOCATION',
            payload: Obj,
          });
        }
        return () => {
          console.log("getPermission clearWatch")
          Geolocation.clearWatch(position)
        };
      },
      (error) => {
        console.log("getPermission error",error)
        setIsLoading(false), setIsLocation(false);
        console.log('L', error.message);
      },
      { enableHighAccuracy: true, timeout: 2000}
    );
    Geolocation.watchPosition((position) => {
      //Will give you the location on location change

      const currentLongitude = JSON.stringify(position.coords.longitude);
      //getting the Longitude from the location json
      const currentLatitude = JSON.stringify(position.coords.latitude);
      setCurrentLate(currentLatitude);
      setCurrentLong(currentLongitude);
      setIsLoading(false);

      const Obj = {
        currentLatitude,
        currentLongitude,
      };

      if (currentLatitude && currentLongitude) {
        callcreateGuestUser(Obj);
        dispatch({
          type: 'GET_CURRENT_LOCATION',
          payload: Obj,
        });
      }
      return () => Geolocation.clearWatch(position);
    });
  };

  const callcreateGuestUser = async (obj) => {
    const getUser = JSON.parse(await AsyncStorage.getItem('guestUser'));

    if (getUser !== null) {
      const guestUser = {
        userId: getUser.user_id,
        location: obj,
      };
      // console.log('up');
      dispatch(updateGuestUser(guestUser));
    } else {
      // console.log('cr');
      let FCMToken = await messaging().getToken();
      obj.device_id = FCMToken;
      // console.log('obj >>>>>>>>>>>>>>>>',obj);
      // alert(JSON.stringify(obj))
      dispatch(createGuestUser(obj));
    }
  };

  return (
    <>
      {
        isLoading ? (
          <Loader loading={isLoading} />
        ) : 
        isLocation ?
        <Navigation props = {props} />
        :
        <Forbidden handleCheckLocation = {handleCheckLocation} />
      }
      <CustomToster />
    </>
  );
};

export default Startup;
