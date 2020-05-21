import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the homePage state domain
 */

const selectHomePageDomain = state => state.home || initialState;

/**
 * Other specific selectors
 */

const makeSelectTidbits = () =>
  createSelector(
    selectHomePageDomain,
    home => home.tidbits,
  );

const makeSelectFetching = () =>
  createSelector(
    selectHomePageDomain,
    home => home.fetching,
  );

const makeSelectResulted = () =>
  createSelector(
    selectHomePageDomain,
    home => home.resulted,
  );

const makeSelectError = () =>
  createSelector(
    selectHomePageDomain,
    home => home.error,
  );

/**
 * Default selector used by HomePage
 */

const makeSelectHomePage = () =>
  createSelector(
    selectHomePageDomain,
    substate => substate,
  );

export default makeSelectHomePage;
export {
  selectHomePageDomain,
  makeSelectTidbits,
  makeSelectFetching,
  makeSelectResulted,
  makeSelectError,
};
