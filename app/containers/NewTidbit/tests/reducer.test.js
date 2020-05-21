import produce from 'immer';
import newTidbitReducer from '../reducer';
import {
  changeTidbit,
  saveTidbit,
  saveTidbitSuccess,
  saveTidbitFailure,
  resetTidbit,
} from '../actions';

/* eslint-disable default-case, no-param-reassign */
describe('newTidbitReducer', () => {
  let state;
  const initialState = {
    tidbit: '',
    saving: false,
    resulted: false,
    error: false,
  };
  beforeEach(() => {
    state = { ...initialState };
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(newTidbitReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle saveTidbit action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.saving = true;
      draft.resulted = false;
      draft.error = false;
    });
    expect(newTidbitReducer(state, saveTidbit())).toEqual(expectedResult);
  });

  it('should handle saveTidbitSuccess action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.tidbit = '';
      draft.saving = false;
      draft.resulted = true;
    });
    expect(newTidbitReducer(state, saveTidbitSuccess())).toEqual(
      expectedResult,
    );
  });

  it('should handle saveTidbitFailure action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.saving = false;
      draft.resulted = true;
      draft.error = true;
    });
    expect(newTidbitReducer(state, saveTidbitFailure())).toEqual(
      expectedResult,
    );
  });

  it('should handle resetTidbit action correctly', () => {
    state.tidbit = 'hi';
    state.saving = true;
    state.resulted = true;
    state.error = true;
    const expectedResult = produce(state, draft => {
      draft.tidbit = initialState.tidbit;
      draft.saving = initialState.saving;
      draft.resulted = initialState.resulted;
      draft.error = initialState.error;
    });
    expect(newTidbitReducer(state, resetTidbit())).toEqual(expectedResult);
  });

  describe('changeTidbit action', () => {
    it('should update tidbit if currently not in saving state', () => {
      const tidbit = 'cool';
      const expectedResult = produce(state, draft => {
        draft.tidbit = tidbit;
        draft.resulted = false;
        draft.error = false;
      });
      expect(newTidbitReducer(state, changeTidbit(tidbit))).toEqual(
        expectedResult,
      );
    });

    it('should not update tidbit if currently in saving state', () => {
      state.saving = true;
      const tidbit = 'cool';
      const expectedResult = produce(state, () => {});
      expect(newTidbitReducer(state, changeTidbit(tidbit))).toEqual(
        expectedResult,
      );
    });
  });
});
