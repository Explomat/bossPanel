import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';
import TestsBlock from '../components/tests/TestsBlock';

class Tests extends Component {

	componentWillMount(){
		const {loadTests} = this.props;
		loadTests('month');
	}

	render(){
		return(
			<TestsBlock {...this.props} />
		)
	}
}

function mapStateToProps(state) {
  const {tests} = state;
  return {
  	...tests
  }
}

export default connect(mapStateToProps, actionCreators)(Tests)