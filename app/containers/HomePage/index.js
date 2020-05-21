/**
 *
 * HomePage
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { v4 as uuidv4 } from 'uuid';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { fetchTidbits } from './actions';
import {
  makeSelectTidbits,
  makeSelectFetching,
  makeSelectResulted,
  makeSelectError,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import FeedbackSection from '../../components/FeedbackSection';

const key = 'home';

export function HomePage({
  tidbits,
  fetching,
  resulted,
  error,
  fetchTidbitsFromAPI,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    fetchTidbitsFromAPI();
  }, []);

  return (
    <article>
      <Helmet>
        <title>Tidbits</title>
        <meta name="description" content="See all the tidbits here!" />
      </Helmet>
      <h1>
        <FormattedMessage {...messages.header} />
      </h1>
      <section>
        <button type="button" onClick={fetchTidbitsFromAPI} disabled={fetching}>
          Refresh list of tidbits
        </button>
        <FeedbackSection
          loading={fetching}
          resulted={resulted}
          error={error}
          successMessage="Tidbits up to date!"
          errorMessage="Problem fetching tidbits. Please try again."
        />
        {/* <div>{fetching ? 'Fetching...' : ''}</div>
        <div>{error ? 'Error' : ''}</div> */}
        <div>
          {resulted && !error && tidbits.length === 0
            ? 'No Tidbits yet! Add the first tidbit!'
            : ''}
        </div>
        <div>
          {/* eslint-disable indent */
          tidbits.length > 0
            ? tidbits.map(tidbitString => (
                <div key={uuidv4()}>{tidbitString}</div>
              ))
            : ''}
        </div>
      </section>
    </article>
  );
}

HomePage.propTypes = {
  tidbits: PropTypes.arrayOf(PropTypes.string).isRequired,
  fetching: PropTypes.bool.isRequired,
  resulted: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  fetchTidbitsFromAPI: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  tidbits: makeSelectTidbits(),
  fetching: makeSelectFetching(),
  resulted: makeSelectResulted(),
  error: makeSelectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchTidbitsFromAPI: () => dispatch(fetchTidbits()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(HomePage);
