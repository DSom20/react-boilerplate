import { call, put, takeLatest, cancelled } from 'redux-saga/effects';

import { FETCH_TIDBITS } from './constants';
import { fetchTidbitsSuccess, fetchTidbitsFailure } from './actions';
import * as API from '../../utils/API';

// Individual exports for testing
export default function* homePageSaga() {
  yield takeLatest(FETCH_TIDBITS, fetchTidbitsSaga);
}

function* fetchTidbitsSaga() {
  try {
    const tidbits = yield call(API.getTidbits);
    yield put(fetchTidbitsSuccess(tidbits));
  } catch (error) {
    yield put(fetchTidbitsFailure()); // could dispatch actual error/message...
  } finally {
    if (yield cancelled()) {
      // Don't really need anything here, since the only way it will be cancelled
      // is via another FETCH_TIDBITS action
    }
  }
}
