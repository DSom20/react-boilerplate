/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { take, select, fork, cancel, call, put } from 'redux-saga/effects';
import { cloneableGenerator, createMockTask } from '@redux-saga/testing-utils';
import newTidbitSaga, { attemptToPost } from '../saga';
import {
  SAVE_TIDBIT,
  SAVE_TIDBIT_SUCCESS,
  SAVE_TIDBIT_FAILURE,
  RESET_TIDBIT,
} from '../constants';
import { selectTidbit } from '../selectors';
import {
  saveTidbit,
  resetTidbit,
  saveTidbitSuccess,
  saveTidbitFailure,
} from '../actions';
import * as API from '../../../utils/API';

// const generator = newTidbitSaga();

describe('attemptToPost Saga', () => {
  const tidbit = 'sweet';
  const attemptToPostGenerator = cloneableGenerator(attemptToPost)(tidbit);

  it('should call API.addNewTidbit with tidbit passed as param to saga', () => {
    const callDescriptor = attemptToPostGenerator.next().value;
    expect(callDescriptor).toEqual(call(API.addNewTidbit, tidbit));
  });

  it('If tidbit posted successfully, should dispatch saveTidbitSucces action', () => {
    const clonedGenerator = attemptToPostGenerator.clone();
    const response = { tidbit: 'sweet' };
    const putDescriptor = clonedGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(saveTidbitSuccess(response)));
  });

  it('If tidbit posting failed, should dispatch saveTidbitFailure action', () => {
    const clonedGenerator = attemptToPostGenerator.clone();
    const response = new Error('Tidbit Failed to Save');
    const putDescriptor = clonedGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(saveTidbitFailure(response)));
  });
});

describe('newTidbitSaga Saga', () => {
  const newTidbitsGenerator = cloneableGenerator(newTidbitSaga)();
  const mockTask = createMockTask();

  it('should wait for SAVE_TIDBIT action', () => {
    const takeDescriptor = newTidbitsGenerator.next().value;
    expect(takeDescriptor).toEqual(take(SAVE_TIDBIT));
  });

  it('should then select tidbit from store', () => {
    const mockAction = saveTidbit();
    const selectDescriptor = newTidbitsGenerator.next(mockAction).value;
    expect(selectDescriptor).toEqual(select(selectTidbit));
  });

  it('should then fork attemptToPost saga with selected tidbit', () => {
    const tidbit = 'hi';
    const forkDescriptor = newTidbitsGenerator.next(tidbit).value;
    expect(forkDescriptor).toEqual(fork(attemptToPost, tidbit));
  });

  it('should then wait for first action of RESET_TIDBIT, SAVE_TIDBIT_FAILURE, SAVE_TIDBIT_SUCCESS.', () => {
    const takeDescriptor = newTidbitsGenerator.next(mockTask).value;
    expect(takeDescriptor).toEqual(
      take([RESET_TIDBIT, SAVE_TIDBIT_FAILURE, SAVE_TIDBIT_SUCCESS]),
    );
  });

  describe('saga that cancels forked saga/task due to RESET_TIDBIT', () => {
    let clonedGenerator;
    beforeAll(() => {
      clonedGenerator = newTidbitsGenerator.clone();
    });

    it('should cancel the forked saga if next action is RESET_TIDBIT', () => {
      const mockResetAction = resetTidbit();
      const cancelDescriptor = clonedGenerator.next(mockResetAction).value;
      expect(cancelDescriptor).toEqual(cancel(mockTask));
    });

    it('should then loop back to wait for next SAVE_TIDBIT action', () => {
      const takeDescriptor = clonedGenerator.next().value;
      expect(takeDescriptor).toEqual(take(SAVE_TIDBIT));
    });
  });

  describe('saga that does not cancel forked saga/task', () => {
    let clonedGenerator;
    beforeEach(() => {
      clonedGenerator = newTidbitsGenerator.clone();
    });

    it('Given action SAVE_TIDBIT_SUCCESS, should then loop back to wait for next SAVE_TIDBIT action', () => {
      const mockSuccessAction = saveTidbitSuccess();
      const takeDescriptor = clonedGenerator.next(mockSuccessAction).value;
      expect(takeDescriptor).toEqual(take(SAVE_TIDBIT));
    });

    it('Given action SAVE_TIDBIT_FAILURE, should then loop back to wait for next SAVE_TIDBIT action', () => {
      const mockFailureAction = saveTidbitFailure();
      const takeDescriptor = clonedGenerator.next(mockFailureAction).value;
      expect(takeDescriptor).toEqual(take(SAVE_TIDBIT));
    });
  });
});
