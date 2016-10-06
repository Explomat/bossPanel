import React, { Component, PropTypes } from 'react';
import RequestsBlock from '../components/requests/RequestsBlock';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';

class Requests extends Component {

  render() {
    return (
      <RequestsBlock {...this.props}/>
    )
  }
}

function mapStateToProps(state) {
  return {
    requestsInfo: state.requestsInfo
  }
}

export default connect(mapStateToProps, actionCreators)(Requests)