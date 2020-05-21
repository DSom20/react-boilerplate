/*
 *
 * NewTidbit reducer
 *
 */
import produce from 'immer';
import {
  CHANGE_TIDBIT,
  SAVE_TIDBIT,
  SAVE_TIDBIT_SUCCESS,
  SAVE_TIDBIT_FAILURE,
  RESET_TIDBIT,
} from './constants';

/*
  Could make saving/resulted/errors properties of "save", which would have 
  its own sub-reducer. This would allow for some memoization use out of reselector
*/
const initialState = {
  tidbit: '',
  saving: false,
  resulted: false,
  error: false,
};

/*
  Expected key for this domain on parent/global state object. Used, eg, by useInjectReducer
*/
const domainKey = 'newTidbit';

/* eslint-disable default-case, no-param-reassign */
/*
  Immer's produce takes old state, then a callback which takes a copy of old state
  and returns nothing, but is meant to mutate the old-state-copy given as parameter.
  Produce itself ends up returning that old-state-copy after its been run through the
  callback.
  This all works inside a reducer because a reducer takes (state, action) and 
  returns what the new state should look be
  POTENTIAL PROBLEM: Normally, default is to return actual oldState reference,
  but now returning different reference even if nothing changed...
  SOLUTION: that's what selectors are for. Select for one branch down 
  (eg tidbit, saving), not simply whether parent newTidbit state has changed.
  ALSO: eslint comment above b/c normally want default case in switch, but 
  for immer produce don't care about return value. So could have default to just
  break...but just unnecessary

  Currently not doing anything with payload of SAVE_TIDBIT_SUCCESS, SAVE_TIDBIT_FAILURE
  actions
*/
const newTidbitReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_TIDBIT:
        // Backup mechanism to prevent user from changing tidbit during save process
        // (Initial mechanism is to disable input HTML element while saving)
        if (!draft.saving) {
          draft.tidbit = action.tidbit;
        }
        break;
      case SAVE_TIDBIT:
        draft.saving = true;
        draft.resulted = false;
        draft.error = false;
        break;
      case SAVE_TIDBIT_SUCCESS:
        draft.tidbit = '';
        draft.saving = false;
        draft.resulted = true;
        break;
      case SAVE_TIDBIT_FAILURE:
        draft.saving = false;
        draft.resulted = true;
        draft.error = true;
        break;
      case RESET_TIDBIT:
        draft.tidbit = initialState.tidbit;
        draft.saving = initialState.saving;
        draft.resulted = initialState.resulted;
        draft.error = initialState.error;
        break;
    }
  });

export default newTidbitReducer;
export { initialState, domainKey };
