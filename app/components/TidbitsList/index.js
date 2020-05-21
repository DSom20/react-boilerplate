/**
 *
 * TidbitsList
 *
 * Note: I'm using uuid to create unique key on each rerender. Not ideal.
 * This essentially causes DOM to update to brand new list even if prop
 * was actually the same referenced list as previously.
 *
 * Current Solution: Wrap component in memo() so that component will not
 * rerender unless prop is different. This works for this app, since we
 * just want to replace the whole list if that happens anyway.
 *
 * Another solution: Store strings in redux store as objects like
 * { id: uuid(), content: <string> }. So we would give it a uuid immmediately
 * upon fetching.
 *
 * Ideal solution: Have the backend create the id and store strings
 * not as array of strings but array of objects with id/content. But that's
 * against the specs of the assignment.
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import Wrapper from './Wrapper';
import TidbitListItem from '../TidbitListItem';

function TidbitsList({ tidbits }) {
  return (
    <Wrapper>
      {tidbits.map(tidbitString => (
        <TidbitListItem key={uuidv4()}>{tidbitString}</TidbitListItem>
      ))}
    </Wrapper>
  );
}

TidbitsList.propTypes = {
  tidbits: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default memo(TidbitsList);
