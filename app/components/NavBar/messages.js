/*
 * NavBar Messages
 *
 * This contains all the text for the NavBar component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.NavBar';

export default defineMessages({
  homeLinkMessage: {
    id: `${scope}.home_link.message`,
    defaultMessage: 'Home',
  },
  newTidbitLinkMessage: {
    id: `${scope}.new_tidbit_link.message`,
    defaultMessage: 'Add a Tidbit!',
  },
});
