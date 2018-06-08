import axios from 'axios';
import {
  AUTH_ERROR,
  AUTH_START,
  AUTH_SUCCESS,
} from './types';

/** sets authorization token to header
 *
 * @param {string} token
 * @return {*} null
 */
export const setAuthorizationToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-access-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-access-token'];
  }
};

/** registers a new user
 *
 * @param {Object} newUser a new users credentials
 * @return {function} dispatch
 */
export const signupUser = ({ email, password, username }) => (
  (dispatch) => {
    dispatch({ type: AUTH_START });
    return axios.post(
      'http://localhost:5000/api/v1/signup',
      { email, password, username }
    )
      .then((response) => {
        setAuthorizationToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        dispatch({
          type: AUTH_SUCCESS,
          payload: response.data.user.local
        });
      })
      .catch((error) => {
        dispatch({
          type: AUTH_ERROR,
          payload: error.message
        });
      });
  }
);

/** @description signs in user
 *
 * @param {Object} user a users credentials
 * @return {function} dispatch
 */
export const signinUser = ({ username, password }) => (
  dispatch => (
    axios.post('http://localhost:5000/api/v1/signin', { username, password })
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        setAuthorizationToken(response.data.token);
        dispatch({
          type: AUTH_SUCCESS,
          payload: response.data.user.local
        });
      })
      .catch((error) => {
        dispatch({
          type: AUTH_ERROR,
          payload: error.message
        });
      })
  )
);

/** @description logs out an already logged in user
 *
 * @return {function} dispatch
 */
export const logoutUser = () => (
  (dispatch) => {
    localStorage.clear();
    setAuthorizationToken('');
    dispatch({ type: AUTH_ERROR });
  }
);
