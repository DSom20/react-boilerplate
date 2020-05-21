/*
 *
 * HomePage reducer
 *
 */
import produce from 'immer';
import {
  FETCH_TIDBITS,
  FETCH_TIDBITS_SUCCESS,
  FETCH_TIDBITS_FAILURE,
} from './constants';

export const initialState = {
  tidbits: [],
  fetching: false,
  resulted: false,
  error: false,
};

/* eslint-disable default-case, no-param-reassign */
const homePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_TIDBITS:
        draft.fetching = true;
        draft.resulted = false;
        draft.error = false;
        break;
      case FETCH_TIDBITS_SUCCESS:
        draft.tidbits = action.tidbits;
        draft.fetching = false;
        draft.resulted = true;
        draft.error = false;
        break;
      case FETCH_TIDBITS_FAILURE:
        draft.fetching = false;
        draft.resulted = true;
        draft.error = true; // could get specific and receive actual error messages
        break;
    }
  });

export default homePageReducer;
