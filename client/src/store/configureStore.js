import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';

import rootReducer from '../reducers';

/** @description redux store
 *
 * @param {object} initialState
 *
 * @returns {*} null
 */
const ConfigureStore = initialState => createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(reduxThunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ ?
      window.__REDUX_DEVTOOLS_EXTENSION__() : r => r
  )
);

export default ConfigureStore;
