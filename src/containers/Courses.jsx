import React, { Component, PropTypes } from 'react';
import CoursesBlock from '../components/courses/CoursesBlock';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';

class Courses extends Component {

  render() {
    return (
      <CoursesBlock {...this.props}/>
    )
  }
}

function mapStateToProps(state) {
  return {
    coursesPeriodFetching: state.coursesPeriodFetching,
    coursesPeriodError: state.coursesPeriodError,
    selectedCoursesPeriod: state.selectedCoursesPeriod,

    coursesResultInfo: state.coursesResultInfo
  }
}
export default connect(mapStateToProps, actionCreators)(Courses)
