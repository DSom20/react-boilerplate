/**
 *
 * NavBar
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
// import { NavLink } from 'react-router-dom';
import messages from './messages';
import Wrapper from './Wrapper';
import StyledNavLink from './StyledNavLink';

function NavBar() {
  return (
    <Wrapper>
      <StyledNavLink exact to="/">
        <FormattedMessage {...messages.homeLinkMessage} />
      </StyledNavLink>
      <StyledNavLink exact to="/new">
        <FormattedMessage {...messages.newTidbitLinkMessage} />
      </StyledNavLink>
    </Wrapper>
  );
}

NavBar.propTypes = {};

export default NavBar;
