import {
  CREATE_POLL_ERROR,
  CREATE_POLL_START,
  CREATE_POLL_SUCCESS
} from '../../actions/types';

import initialState from '../initialState';

export default (state = initialState.newPoll, action) => {
  switch (action.type) {
    case CREATE_POLL_ERROR:
      return {
        ...state,
        creatingPoll: false,
        error: action.payload
      };
    case CREATE_POLL_START:
      return {
        ...state,
        creatingPoll: true,
      };
    case CREATE_POLL_SUCCESS:
      return {
        creatingPoll: false,
        error: '',
        pollDetails: action.payload,
      };

    default:
      return state;
  }
};
