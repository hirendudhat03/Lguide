const initialState = {
  isLoading: false,
  guestUser: {},
};

// FOR CREATE GUEST USER
const GuestUser = (state = initialState, action) => {
  const {payload, type} = action;
  
    switch (action.type) {
        case 'CREATE_GUEST_USER_REQUEST':
            return {...state, isLoading: true};
        case 'CREATE_GUEST_USER_SUCCESS':
            return {...state,guestUser : payload.data, isLoading: false};
        case 'CREATE_GUEST_USER_FAILURE':
            return {...state, isLoading: false};
        default:
            return state;
      }
  
};




export default GuestUser
