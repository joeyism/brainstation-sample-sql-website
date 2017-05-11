import { createStore } from 'redux';
import rootReducer from './reducers';

var Store = (initialState) => {
    return createStore(
        rootReducer, 
        initialState,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
}
const StoreInstance = Store();


export default StoreInstance;
