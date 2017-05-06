import { createStore } from 'redux';
import rootReducer from './reducers';

var Store = (initialState) => {
    return createStore(rootReducer, initialState);
}
const StoreInstance = Store();


export default StoreInstance;
