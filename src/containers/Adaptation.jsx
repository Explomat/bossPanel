import React, { Component, PropTypes } from 'react';
import AdaptationBlock from '../components/adaptation/AdaptationBlock';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';

class Adaptation extends Component {

  render() {
    const {adaptationFetching, adaptationError} = this.props;

    if (adaptationFetching){
      return <h2>Loading adaptation....</h2>
    }
    return (
      adaptationError ? 
        <h2>{adaptationError}</h2> :
        <AdaptationBlock {...this.props}/>
    )
  }
}

function mapStateToProps(state) {
  return {
    adaptResultInfo: state.adaptResultInfo,
    adaptationFetching: state.adaptationFetching,
    adaptationError: state.adaptationError
  }
}

export default connect(mapStateToProps, actionCreators)(Adaptation)