import React, { Component, PropTypes } from 'react';
import ChartBlock from '../chart/ChartBlock';

class Courses extends Component {

  render() {
    const { coursesResultInfo, selectedCoursesPeriod, selectCoursesResultByPeriod, coursesPeriodFetching } = this.props;

    return (
      <ChartBlock 
        title="Курсы" 
        chartData={coursesResultInfo} 
        selectedPeriod={selectedCoursesPeriod} 
        onSelectPeriod={selectCoursesResultByPeriod}
        fetching={coursesPeriodFetching}/>
    )
  }
}

export default Courses;
