/*
 *
 * NewTidbit actions
 *
 */

import {
  CHANGE_TIDBIT,
  SAVE_TIDBIT,
  SAVE_TIDBIT_SUCCESS,
  SAVE_TIDBIT_FAILURE,
  RESET_TIDBIT,
} from './constants';

export function changeTidbit(tidbit) {
  return {
    type: CHANGE_TIDBIT,
    tidbit,
  };
}

export function saveTidbit() {
  return {
    type: SAVE_TIDBIT,
  };
}

export function saveTidbitSuccess(response) {
  return {
    type: SAVE_TIDBIT_SUCCESS,
    response,
  };
}

export function saveTidbitFailure(error) {
  return {
    type: SAVE_TIDBIT_FAILURE,
    error,
  };
}

export function resetTidbit() {
  return {
    type: RESET_TIDBIT,
  };
}

// export function defaultAction() {
//   return {
//     type: DEFAULT_ACTION,
//   };
// }
