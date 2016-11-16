import React, { Component, PropTypes } from 'react';
import * as actionCreators from '../actions';
import omit from 'lodash/omit';

import Container from './Container';
import {AlertDanger} from '../components/modules/alert';

import { connect } from 'react-redux';


const App = ({access, isFetching, error, ...props}) => {
  const { tests, courses, adaptation, requests } = props;

  return (
    <div className="boss-panel">
      <div className="boss-panel__container">
        {isFetching ? <div className="overlay-loading overlay-loading--show"></div> : 
          error ? <AlertDanger text={error} /> : 
          access === true ? 
          <Container {...props}/> :
          <h1>Доступ запрещен</h1>
        }
      </div>
    </div>
  )
}

App.propTypes = {
  children: PropTypes.element
}

function mapStateToProps(state) {
  const {isFetching, access, error} = state.app;
  return {
    isFetching,
    access,
    error,
    ...state
  }
}

/*function mapDispatchToProps(dispatch) {
  let actions = bindActionCreators(actionCreators, dispatch);
  return { ...actions, dispatch };
}*/

export default connect(mapStateToProps, actionCreators)(App)
