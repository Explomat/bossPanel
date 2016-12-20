import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';
import RequestsBlock from '../components/requests/RequestsBlock';

class Requests extends Component {

	componentWillMount(){
		const {loadRequests} = this.props;
		loadRequests();
	}

	render(){
		return(
			<RequestsBlock {...this.props}/>
		)
	}
}

function filterSearch(arr, searchValue){
	return arr.filter(item => {
		const name = item.personFullname.toLowerCase();
		const code = item.code.toString().toLowerCase();
		const objectName = item.objectName.toLowerCase();
		return (~name.indexOf(searchValue) || ~code.indexOf(searchValue) || ~objectName.indexOf(searchValue));
	});
}

function mapStateToProps(state) {
  const {requests} = state;
  const {requestsInfo, searchValue} = requests;
  return {
  	...requests,
  	requestsInfo: filterSearch(requestsInfo, searchValue),
  	count: requestsInfo.length
  }
}

export default connect(mapStateToProps, actionCreators)(Requests)