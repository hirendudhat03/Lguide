// export const GET_ALL_SERVICES_REQUEST = 'GET_ALL_SERVICES_REQUEST';
// export const GET_ALL_SERVICES_SUCCESS = 'GET_ALL_SERVICES_SUCCESS';
// export const GET_ALL_SERVICES_FAILURE = 'GET_ALL_SERVICES_FAILURE';

// export const GET_SUB_SERVICES_REQUEST = 'GET_SUB_SERVICES_REQUEST';
// export const GET_SUB_SERVICES_SUCCESS = 'GET_SUB_SERVICES_SUCCESS';
// export const GET_SUB_SERVICES_FAILURE = 'GET_SUB_SERVICES_FAILURE';

 const actionTypes = prefix => {
    return {
      REQUEST: `${prefix}_REQUEST`,
      SUCCESS: `${prefix}_SUCCESS`,
      FAILURE: `${prefix}_FAILURE`,
      prefix,
    };
  };
  
  export default actionTypes