import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';
///import root reducer from file we created

const initialState = {
    token:'',
    user: {}
  }

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())



export default store;
