import React, { Component } from 'react';
import ChartBlock from '../chart/ChartBlock';
import {AlertDanger} from '../modules/alert';

import './courses-block.scss';

class CoursesBlock extends Component {

  render() {
    const { coursesResultFetching, coursesResultError } = this.props;
    const { coursesResultInfo, selectedCoursesPeriod, selectCoursesResultByPeriod, coursesPeriodFetching } = this.props;

    return (
      <div className="courses-block">
        {coursesResultFetching ? <div className="overlay-loading overlay-loading--show"></div> : 
          coursesResultError ? <AlertDanger text={coursesResultError}/> : 
            (<ChartBlock 
              title="Курсы" 
              chartData={coursesResultInfo} 
              selectedPeriod={selectedCoursesPeriod} 
              onSelectPeriod={selectCoursesResultByPeriod}
              fetching={coursesPeriodFetching}/>)
        }
      </div>
    )
  }
}

export default CoursesBlock;
