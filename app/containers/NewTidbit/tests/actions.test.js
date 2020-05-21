import {
  changeTidbit,
  resetTidbit,
  saveTidbit,
  saveTidbitSuccess,
  saveTidbitFailure,
} from '../actions';
import {
  CHANGE_TIDBIT,
  SAVE_TIDBIT,
  SAVE_TIDBIT_SUCCESS,
  SAVE_TIDBIT_FAILURE,
  RESET_TIDBIT,
} from '../constants';

describe('NewTidbit actions', () => {
  describe('changeTidbit Action', () => {
    it('has a type of CHANGE_TIDBIT and passes through tidbit property', () => {
      const tidbit = 'hello';
      const expected = {
        type: CHANGE_TIDBIT,
        tidbit,
      };
      expect(changeTidbit(tidbit)).toEqual(expected);
    });
  });

  describe('resetTidbit Action', () => {
    it('has a type of RESET_TIDBIT', () => {
      const expected = {
        type: RESET_TIDBIT,
      };
      expect(resetTidbit()).toEqual(expected);
    });
  });

  describe('saveTidbit Action', () => {
    it('has a type of SAVE_TIDBIT', () => {
      const expected = {
        type: SAVE_TIDBIT,
      };
      expect(saveTidbit()).toEqual(expected);
    });
  });

  describe('saveTidbitSuccess Action', () => {
    it('has a type of SAVE_TIDBIT_SUCCESS', () => {
      const response = { tidbit: 'this is a cool tidbit' };
      const expected = {
        type: SAVE_TIDBIT_SUCCESS,
        response,
      };
      expect(saveTidbitSuccess(response)).toEqual(expected);
    });
  });

  describe('saveTidbitFailure Action', () => {
    it('has a type of SAVE_TIDBIT_FAILURE and passes through error', () => {
      const error = 'error message';
      const expected = {
        type: SAVE_TIDBIT_FAILURE,
        error,
      };
      expect(saveTidbitFailure(error)).toEqual(expected);
    });
  });
});
