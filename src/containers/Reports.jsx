import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';
import ReportsBlock from '../components/reports/ReportsBlock';

class Reports extends Component {

	componentWillMount(){
		const {loadReports} = this.props;
		loadReports();
	}

	render(){
		return(
			<ReportsBlock {...this.props} />
		)
	}
}

function mapStateToProps(state) {
  const {reports} = state;
  return {
  	...reports
  }
}

export default connect(mapStateToProps, actionCreators)(Reports)