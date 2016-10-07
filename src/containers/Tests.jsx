import React, { Component, PropTypes } from 'react';
import TestsBlock from '../components/tests/TestsBlock';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';

class Tests extends Component {
  render() {
    const { testsFetching, testsError } = this.props;

    if (testsFetching){
      return <h2>Loading tests....</h2>
    }
    return (
      testsError ? 
        <h2>{testsError}</h2> :
        <TestsBlock {...this.props}/>
    )
  }
}

function mapStateToProps(state) {
  return {
    testsFetching: state.testsFetching,
    testsError: state.testsError,
    testsPeriodFetching: state.testsPeriodFetching,
    testsPeriodError: state.testsPeriodError,
    selectedTestsPeriod: state.selectedTestsPeriod,

    testsResultInfo: state.testsResultInfo
  }
}

export default connect(mapStateToProps, actionCreators)(Tests)
