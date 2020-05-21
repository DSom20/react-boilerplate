import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import {
  SAVE_TIDBIT,
  SAVE_TIDBIT_FAILURE,
  RESET_TIDBIT,
  SAVE_TIDBIT_SUCCESS,
} from './constants';
import { saveTidbitSuccess, saveTidbitFailure } from './actions';
import { selectTidbit } from './selectors';
import * as API from '../../utils/API';

// Individual exports for testing
export default function* newTidbitSaga() {
  while (true) {
    yield take(SAVE_TIDBIT);
    const tidbit = yield select(selectTidbit);
    const task = yield fork(attemptToPost, tidbit);
    const action = yield take([
      RESET_TIDBIT,
      SAVE_TIDBIT_FAILURE,
      SAVE_TIDBIT_SUCCESS,
    ]);
    if (action.type === RESET_TIDBIT) {
      yield cancel(task);
    }
    // end blocking. Now can listen again for SAVE_TIDBIT
  }
}

export function* attemptToPost(tidbit) {
  try {
    // Reducer isn't doing anything with response right now. But might be helpful
    // at some point
    const response = yield call(API.addNewTidbit, tidbit);
    yield put(saveTidbitSuccess(response));
  } catch (error) {
    // Reducer isn't doing anything with error currently
    yield put(saveTidbitFailure(error));
  }
  // finally {
  // if (yield cancelled()) {
  //   // Don't really need anything here, since the only way it will be cancelled
  //   // is via RESET_TIDBIT, which essentially cleans up/resets everything anyway
  // }
  // }
}
