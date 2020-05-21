/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.HomePage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Welcome to the Home of All the Best Tidbits!',
  },
  // Need to review react-intl docs to figure out best way to use these
  fetchSuccess: {
    id: `${scope}.fetchSuccess`,
    defaultMessage: 'Tidbits up to date!',
  },
  fetchFailure: {
    id: `${scope}.fetchFailure`,
    defaultMessage: 'Problem fetching tidbits. Please try again.',
  },
});
