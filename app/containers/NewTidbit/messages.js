/*
 * NewTidbit Messages
 *
 * This contains all the text for the NewTidbit container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.NewTidbit';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Enter a new tidbit on this page!',
  },
  label: {
    id: `${scope}.label`,
    defaultMessage: 'Enter Tidbit: ',
  },
});
