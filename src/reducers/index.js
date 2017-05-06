import cart from './cart';
import users from './user';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    cart,
    users
});

export default rootReducer;
