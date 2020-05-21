/*
 *
 * HomePage actions
 *
 */

import {
  FETCH_TIDBITS,
  FETCH_TIDBITS_SUCCESS,
  FETCH_TIDBITS_FAILURE,
} from './constants';

export function fetchTidbits() {
  return {
    type: FETCH_TIDBITS,
  };
}

export function fetchTidbitsSuccess(tidbits) {
  return {
    type: FETCH_TIDBITS_SUCCESS,
    tidbits,
  };
}

export function fetchTidbitsFailure(error) {
  return {
    type: FETCH_TIDBITS_FAILURE,
    error,
  };
}
