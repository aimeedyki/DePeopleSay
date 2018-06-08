import {
  AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_START,
  UNAUTH_USER
} from '../../actions/types';
import initialState from '../initialState';

/** @description reducers for authentication component
 *
 * @param {object} [state=initialState]
 * @param {object} action
 *
 * @returns {object} state
 */
export default (state = initialState.user, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        authenticated: true,
        authLoading: false,
        error: '',
        userDetails: action.payload,
      };
    case UNAUTH_USER:
      return {
        userDetails: {},
        authenticated: false
      };
    case AUTH_ERROR:
      return {
        ...state,
        authLoading: false,
        error: action.payload
      };
    case AUTH_START:
      return {
        ...state,
        authLoading: true,
      };

    default:
      return state;
  }
};
