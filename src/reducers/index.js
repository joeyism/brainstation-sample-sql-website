import cart from './cart';
import users from './user';
import currentuser from './currentuser';
import comments from './addComments';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    cart,
    users,
    currentuser,
    comments
});

export default rootReducer;
