import axios from 'axios';
import {
  CREATE_POLL_ERROR,
  CREATE_POLL_START,
  CREATE_POLL_SUCCESS
} from './types';

const startCreatePoll = () => ({
  type: CREATE_POLL_START
});

const createPollSuccess = payload => ({
  type: CREATE_POLL_SUCCESS,
  payload
});

const createPollError = error => ({
  type: CREATE_POLL_ERROR,
  payload: error
});

export const createPoll = ({ question, isAnonymous }, options) => (
  (dispatch) => {
    dispatch(startCreatePoll());
    return axios.post(
      '/api/v1/poll',
      { question, options, isAnonymous }
    )
      .then((response) => {
        dispatch(createPollSuccess(response.data.poll));

        return true;
      })
      .catch((error) => {
        console.log('error', error.response);
        dispatch(createPollError(error.response.data.message));
      });
  }
);
