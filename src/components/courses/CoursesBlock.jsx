import React, { Component, PropTypes } from 'react';
import ChartBlock from '../chart/ChartBlock';

class Courses extends Component {

  render() {
    const { coursesResultInfo, selectedCoursesPeriod, selectCoursesResultByPeriod, coursesFetching } = this.props;

    return (
      <ChartBlock 
        title="Курсы" 
        chartData={coursesResultInfo} 
        selectedPeriod={selectedCoursesPeriod} 
        onSelectPeriod={selectCoursesResultByPeriod}
        fetching={coursesFetching}/>
    )
  }
}

export default Courses;
