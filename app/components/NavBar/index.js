/**
 *
 * NavBar
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import { NavLink } from 'react-router-dom';
import messages from './messages';

function NavBar() {
  return (
    <nav>
      <NavLink to="/">
        <FormattedMessage {...messages.homeLinkMessage} />
      </NavLink>
      <NavLink to="/new">
        <FormattedMessage {...messages.newTidbitLinkMessage} />
      </NavLink>
    </nav>
  );
}

NavBar.propTypes = {};

export default NavBar;
