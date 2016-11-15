import React, { Component } from 'react';
import ChartBlock from '../chart/ChartBlock';
import {AlertDanger} from '../modules/alert';

import './courses-block.scss';

class CoursesBlock extends Component {

  render() {
    const { isFetching, isFetchingByPeriod, error } = this.props;
    const { coursesResultInfo, period, loadCoursesByPeriod} = this.props;

    return (
      <div className="courses-block">
        {isFetching ? <div className="overlay-loading overlay-loading--show"></div> : 
          error ? <AlertDanger text={error}/> : 
            (<ChartBlock 
              title="Курсы" 
              chartData={coursesResultInfo} 
              selectedPeriod={period}
              onSelectPeriod={loadCoursesByPeriod}
              fetching={isFetchingByPeriod}/>)
        }
      </div>
    )
  }
}

export default CoursesBlock;
