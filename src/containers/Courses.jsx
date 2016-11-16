import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';
import CoursesBlock from '../components/courses/CoursesBlock';

class Courses extends Component {

	componentWillMount(){
		const {loadCourses} = this.props;
		loadCourses('month');
	}

	render(){
		return(
			<CoursesBlock {...this.props}/>
		)
	}
}

function mapStateToProps(state) {
  const {courses} = state;
  return {
  	...courses
  }
}

export default connect(mapStateToProps, actionCreators)(Courses)