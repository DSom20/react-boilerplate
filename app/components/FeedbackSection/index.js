/**
 *
 * FeedbackSection
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import LoadingIndicator from '../LoadingIndicator';
import Alert from '../Alert';

function FeedbackSection({
  loading,
  resulted,
  error,
  successMessage,
  errorMessage,
}) {
  let content;
  if (loading) {
    content = <LoadingIndicator />;
  } else if (resulted && !error) {
    content = <Alert type="success" message={successMessage} />;
  } else if (resulted && error) {
    content = <Alert type="error" message={errorMessage} />;
  }
  return <div>{content}</div>;
}

FeedbackSection.propTypes = {
  loading: PropTypes.bool.isRequired,
  resulted: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  successMessage: PropTypes.string,
  errorMessage: PropTypes.string,
};

export default FeedbackSection;
