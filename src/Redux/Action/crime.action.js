import {API_URL} from '@env';
import axios from 'axios';
import actionTypes from './actionType';

const GET_FIR_CRIME = actionTypes('GET_FIR_CRIME');
const ALL_CRIME_TYPES = actionTypes('ALL_CRIME_TYPES');
const ADD_CRIME_TYPE = actionTypes('ADD_CRIME')

const lat = '23.9130464';
const lang = '88.21927070000001';

export const getFirCrime = (params) => {

  console.log('getFirCrime')

  return (dispatch) => {    
    const {latitude , longitude} = params    
    dispatch({
      type: GET_FIR_CRIME.REQUEST,
    });

    console.log('return getFirCrime',latitude , longitude)

    

    var url = 'http://3.14.15.84:5000//crime-plots/fir-crimes?lat='+latitude+'&lng='+longitude+'&radius=5';
    // var url = `${API_URL}/crime-plots/fir-crimes?lat=${22.32626526270974}&lng=${70.76981713995337}&radius=5`
    // var url = `${API_URL}/crime-plots/fir-crimes?lat=${23.913044}&lng=${88.21927070000001}&radius=5`

    console.log('URL : ',url);

    axios({
      // url: `${API_URL}/crime-plots/fir-crimes?lat=${23.9130464}&lng=${88.21927070000001}&radius=5`,
      url: url,
      method: 'get',
      // params: {date: date},
      headers: {'Content-Type': 'application/json', Accept: 'application/json'},
    })
      .then((res) => {
        console.log('res ==> ',res);
        if (res.status === 200) {
          const {data} = res;
          dispatch({
            type: GET_FIR_CRIME.SUCCESS,
            payload: {data: data.results},
          });
        } else {
          dispatch({
            type: GET_FIR_CRIME.FAILURE,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: GET_FIR_CRIME.FAILURE,
        });
      });
  };
};

export const getAllCrimeTypes = () => {
  return (dispatch) => {
    dispatch({
      type: ALL_CRIME_TYPES.REQUEST, 
    });
    axios({
      url: `${API_URL}/crime-plots/crime-types`,
      method: 'get',
      headers: {'Content-Type': 'application/json', Accept: 'application/json'},
    })
      .then((res) => {
        console.log('getAllCrimeTypes', res);
        if (res.status === 200) {
          const {data} = res;
          dispatch({
            type: ALL_CRIME_TYPES.SUCCESS,
            payload: {data},
          });
        } else {
          dispatch({
            type: ALL_CRIME_TYPES.FAILURE,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: ALL_CRIME_TYPES.FAILURE,
        });
      });
  };
};


export const addCrime = (data) => {
  return async(dispatch) => {
   try {
     console.log("__data in action",`${API_URL}/report/crime`)
     let res = await  axios({
      url: `${API_URL}/report/crime`,
      method: 'post',
      data : data,
      headers: {'Content-Type': 'application/json', Accept: 'application/json'},
    })
    return {res: res, apiStatus : true}
   } catch (error) {
    return {error : error, apiStatus : false}
   }
     
  }
}

export const filterCrimeAction = (crimeIndex) => {
  return (dispatch) => {
    dispatch({
      type: 'UPDATE_FILTEREDCRIMES_DATA',
      payload: {index: crimeIndex},
    });
  }
}

export const filterSubCrimeAction = (crimeName) => {
  return (dispatch) => {
    dispatch({
      type: 'UPDATE_FILTERED_SUB_CRIMES_DATA',
      payload: {data: crimeName},
    });
  }
}

