import {API_URL} from '@env';
import AsyncStorage from '@react-native-community/async-storage'; 
import axios from 'axios';
import actionTypes from './actionType';

const createGuestUserType = actionTypes('CREATE_GUEST_USER');
const updateGuestUserType = actionTypes('UPDATE_GUEST_USER');

export const createGuestUser = (currentLocation) => {
  const myCurrentLocation = {
    lat: Number(currentLocation.currentLatitude),
    lng: Number(currentLocation.currentLongitude),
    device_id : currentLocation.device_id
  };
  console.log('AAAAA >>>>>>>>>>>>>',myCurrentLocation);
  return (dispatch) => {   
    dispatch({
      type: createGuestUserType.REQUEST,
    });

    axios({
      url: `${API_URL}/users`,
      method: 'post',
      data: myCurrentLocation,
      // params: {date: date},
      headers: {'Content-Type': 'application/json', Accept: 'application/json'},
    })
      .then((res) => {
        console.log('create user', res);
        if (res.status === 201) {
          AsyncStorage.setItem('guestUser', JSON.stringify(res.data))
          dispatch({
            type: createGuestUserType.SUCCESS,
            payload: {
              data: res.data,
            },
          });
        } else {
          dispatch({
            type: createGuestUserType.FAILURE,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: createGuestUserType.FAILURE,
        });
      });
  };
};

export const updateGuestUser = (guestUser) => {
  // console.log('guestUser',guestUser);
  // console.log('updateGuestUserType',updateGuestUserType);
  const { location, userId } = guestUser
  const myCurrentLocation = {
    lat: Number(location.currentLatitude),
    lng: Number(location.currentLongitude),
  };
  // console.log('myCurrentLocation',myCurrentLocation);
  // console.log(`${API_URL}/users/${userId}/update-location`);
      return (dispatch) => {        
        axios({
          url: `${API_URL}/users/${userId}/update-location`,
          method: 'post',
          data: myCurrentLocation,
          // params: {date: date},
          headers: {'Content-Type': 'application/json', Accept: 'application/json'},
        }).then((res) => {
          // console.log('updated user', res);
        }).catch((err) => {
          console.log(err);
        })
      }
}
