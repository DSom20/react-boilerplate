import { createSelector } from 'reselect';
import { initialState, domainKey } from './reducer';

/**
 * Direct selector to the newTidbit state domain
 * Note: Not sure if really need the || initialState
 */

const selectNewTidbitDomain = state => state[domainKey] || initialState;

/**
 * Other specific selectors
 */

const selectTidbit = createSelector(
  selectNewTidbitDomain,
  newTidbit => newTidbit.tidbit,
);

const makeSelectTidbit = () =>
  createSelector(
    selectNewTidbitDomain,
    newTidbit => newTidbit.tidbit,
  );

const makeSelectSaving = () =>
  createSelector(
    selectNewTidbitDomain,
    newTidbit => newTidbit.saving,
  );

const makeSelectResulted = () =>
  createSelector(
    selectNewTidbitDomain,
    newTidbit => newTidbit.resulted,
  );

const makeSelectError = () =>
  createSelector(
    selectNewTidbitDomain,
    newTidbit => newTidbit.error,
  );

/**
 * Default selector used by NewTidbit
 */

const makeSelectNewTidbit = () =>
  createSelector(
    selectNewTidbitDomain,
    substate => substate,
  );

export default makeSelectNewTidbit;
export {
  selectNewTidbitDomain,
  selectTidbit,
  makeSelectTidbit,
  makeSelectSaving,
  makeSelectResulted,
  makeSelectError,
};
