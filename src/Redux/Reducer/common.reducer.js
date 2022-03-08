const initialState = {
  isDarkMode: false,
  currentLocation: {},
  selectedLocation: {},
  tempNotification: {},
  tosterFlag: false,
  notificationArr: [],
  property: {},
};

// SELECTED_LOCATION
const Common = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_THEME':
      return {...state, isDarkMode: action.payload};
    case 'GET_CURRENT_LOCATION':
      return {...state, currentLocation: action.payload};
    case 'SELECTED_LOCATION':
      console.log('action', action);
      return {...state, selectedLocation: action.payload};
    case 'GET_NOTIFICATION':
      console.log('action', action);
      let tempArr = [...state.notificationArr, action.payload.remoteMessage];
      console.log('tempArr', tempArr);
      return {
        ...state,
        tempNotification: action.payload.remoteMessage,
        tosterFlag: true,
        property: action.payload.props,
        notificationArr: tempArr,
      };
    case 'UPDATE_TOSTER_FLAG':
      return {...state, tosterFlag: false};
    default:
      return state;
  }
};

export default Common;
