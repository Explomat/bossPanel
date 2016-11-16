import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';
import AdaptationBlock from '../components/adaptation/AdaptationBlock';
import {keys as adaptationKeys}  from '../utils/adaptationBlockStatuses';

class Adaptation extends Component {

	componentWillMount(){
		const {loadAdaptation} = this.props;
		loadAdaptation();
	}

	render(){
		return(
			<AdaptationBlock {...this.props} />
		)
	}
}

function filterStatus(arr, status){
	if (status !== adaptationKeys.all) {
		return arr.filter(item => {
			return item.status === status;
		});
	}
	return arr;
}

function filterSearch(arr, searchValue){
	return arr.filter(item => {
		const name = item.personFullname.toLowerCase();
		return ~name.indexOf(searchValue);
	});
}

function mapStateToProps(state) {
  const {adaptation} = state;
  const {adaptResultInfo, searchValue, status} = adaptation;
  return {
  	...adaptation,
  	adaptResultInfo: filterStatus(filterSearch(adaptResultInfo, searchValue), status),
  	count: adaptResultInfo.length
  }
}

export default connect(mapStateToProps, actionCreators)(Adaptation)