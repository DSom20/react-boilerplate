/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import NewTidbit from 'containers/NewTidbit/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import NavBar from 'components/NavBar/index';
import Wrapper from './Wrapper';

import GlobalStyle from '../../global-styles';

export default function App() {
  return (
    <div>
      <NavBar />
      <Wrapper>
        <Switch>
          <Route exact path="/new" component={NewTidbit} />
          <Route exact path="/" component={HomePage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Wrapper>
      <GlobalStyle />
    </div>
  );
}
