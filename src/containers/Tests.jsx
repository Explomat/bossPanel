import React, { Component, PropTypes } from 'react';
import TestsBlock from '../components/tests/TestsBlock';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';

class Tests extends Component {
  render() {
    return (
       <TestsBlock {...this.props}/>
    )
  }
}

function mapStateToProps(state) {
  return {
    testsPeriodFetching: state.testsPeriodFetching,
    testsPeriodError: state.testsPeriodError,
    selectedTestsPeriod: state.selectedTestsPeriod,

    testsResultInfo: state.testsResultInfo
  }
}

export default connect(mapStateToProps, actionCreators)(Tests)
