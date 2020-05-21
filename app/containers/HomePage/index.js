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
import TidbitsList from '../../components/TidbitsList';
import MainArticle from '../../components/MainArticle';
import Button from '../../components/Button';

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

  let tidbitsListSection;
  if (resulted && !error && tidbits.length === 0) {
    tidbitsListSection = (
      <h3>There are no tidbits yet. Write the first tidbit!</h3>
    );
  } else if (tidbits.length > 0) {
    tidbitsListSection = <TidbitsList tidbits={tidbits} />;
  }

  return (
    <MainArticle>
      <Helmet>
        <title>Tidbits</title>
        <meta name="description" content="See all the tidbits here!" />
      </Helmet>
      <h1>
        <FormattedMessage {...messages.header} />
      </h1>
      <section>
        <Button type="button" onClick={fetchTidbitsFromAPI} disabled={fetching}>
          Refresh list of tidbits
        </Button>
        <FeedbackSection
          loading={fetching}
          resulted={resulted}
          error={error}
          successMessage="Tidbits up to date!"
          errorMessage="Problem fetching tidbits. Please try again."
        />
        {tidbitsListSection}
      </section>
    </MainArticle>
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
