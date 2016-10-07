import React, { Component, PropTypes } from 'react';
import AdaptationBlock from '../components/adaptation/AdaptationBlock';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';

class Adaptation extends Component {

  render() {
    return (
      <AdaptationBlock {...this.props}/>
    )
  }
}

function mapStateToProps(state) {
  return {
    adaptResultInfo: state.adaptResultInfo
  }
}

export default connect(mapStateToProps, actionCreators)(Adaptation)