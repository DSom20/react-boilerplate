/**
 *
 * NewTidbit
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { changeTidbit, saveTidbit, resetTidbit } from './actions';
import {
  makeSelectTidbit,
  makeSelectSaving,
  makeSelectResulted,
  makeSelectError,
} from './selectors';
import reducer, { domainKey } from './reducer';
import saga from './saga';
import messages from './messages';
import Form from './Form';
import Input from './Input';
import MainArticle from '../../components/MainArticle';
import Button from '../../components/Button';
import FeedbackSection from '../../components/FeedbackSection';

const key = domainKey;

export function NewTidbit({
  tidbit,
  saving,
  resulted,
  error,
  onChangeTidbit,
  onSubmitForm,
  onUnmount,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => onUnmount, []);

  return (
    <MainArticle>
      <Helmet>
        <title>Add a New Tidbit</title>
        <meta name="description" content="Add a new Tidbit on this page!" />
      </Helmet>
      <h1>
        <FormattedMessage {...messages.header} />
      </h1>
      <section>
        <Form onSubmit={onSubmitForm} data-testid="tidbitForm">
          <label htmlFor="tidbit">
            <FormattedMessage {...messages.label} />
            <Input
              id="tidbit"
              type="text"
              placeholder="Whatever tidbit you can think of!"
              disabled={saving}
              value={tidbit}
              onChange={onChangeTidbit}
            />
          </label>
          <Button type="submit" disabled={saving}>
            Submit Tidbit!
          </Button>
        </Form>
        <FeedbackSection
          loading={saving}
          resulted={resulted}
          error={error}
          successMessage="Saved Tidbit Successfully!"
          errorMessage="There was a problem saving your tidbit. Please try again."
        />
      </section>
    </MainArticle>
  );
}

NewTidbit.propTypes = {
  tidbit: PropTypes.string.isRequired,
  saving: PropTypes.bool.isRequired,
  resulted: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  onChangeTidbit: PropTypes.func.isRequired,
  onSubmitForm: PropTypes.func.isRequired,
  onUnmount: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  tidbit: makeSelectTidbit(),
  saving: makeSelectSaving(),
  resulted: makeSelectResulted(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeTidbit: evt => dispatch(changeTidbit(evt.target.value)),
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(saveTidbit());
    },
    onUnmount: () => dispatch(resetTidbit()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(NewTidbit);
