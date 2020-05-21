/**
 *
 * TidbitsList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
// import styled from 'styled-components';

function TidbitsList({ tidbits }) {
  return (
    <div>
      {tidbits.map(tidbitString => (
        <div key={uuidv4()}>{tidbitString}</div>
      ))}
    </div>
  );
}

TidbitsList.propTypes = {
  tidbits: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TidbitsList;
