import React, { Component } from 'react';
import ChartBlock from '../chart/ChartBlock';
import {AlertDanger} from '../modules/alert';

import './tests-block.scss';

const TestsBlock = ({isFetching, isFetchingByPeriod, error, testsResultInfo, period, loadTestsByPeriod}) => {
  return (
    <div className="tests-block">
      {isFetching ? 
        <div className="overlay-loading overlay-loading--show"></div> : 
        error ? <AlertDanger text={error} /> : 
        (<ChartBlock 
          title="Тестирование" 
          chartData={testsResultInfo} 
          selectedPeriod={period}
          onSelectPeriod={loadTestsByPeriod}
          fetching={isFetchingByPeriod}/>)
      }
    </div>
  )
}

export default TestsBlock;
