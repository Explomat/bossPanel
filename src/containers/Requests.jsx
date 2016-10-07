import React, { Component, PropTypes } from 'react';
import RequestsBlock from '../components/requests/RequestsBlock';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';

class Requests extends Component {

  render() {
  	const { requestsFetching, requestsError } = this.props;
  	if (requestsFetching){
  		return <h2>Loading requests....</h2>
  	}
    return (
		requestsError ? 
		<h2>{requestsError}</h2> :
      	<RequestsBlock {...this.props}/>
    )
  }
}

function mapStateToProps(state) {
  return {
    requestsInfo: state.requestsInfo,
    requestsFetching: state.requestsFetching,
    requestsError: state.requestsError
  }
}

export default connect(mapStateToProps, actionCreators)(Requests)