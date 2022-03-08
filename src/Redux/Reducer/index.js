import { combineReducers } from 'redux';


import Common from './common.reducer';
import crimes from './crime.reducer';
import GuestUser from './guestUser.reducer';

const rootReducer = combineReducers ({
    Common : Common,
    crimes : crimes,
    GuestUser : GuestUser
})
export default rootReducer;