import React, { Component } from 'react';
import ChartBlock from '../chart/ChartBlock';

import './tests-block.scss';

class TestsBlock extends Component {

  render() {
    const { testsResultFetching, testsResultError } = this.props;
    const { testsResultInfo, selectedTestsPeriod, selectTestsResultByPeriod, testsPeriodFetching } = this.props;

    return (
      <div className="tests-block">
        {testsResultFetching ? 
          <div className="overlay-loading overlay-loading--show"></div> : 
          testsResultError ? <h2>{testsResultError}</h2> : 
          (<ChartBlock 
            title="Тестирование" 
            chartData={testsResultInfo} 
            selectedPeriod={selectedTestsPeriod}
            onSelectPeriod={selectTestsResultByPeriod}
            fetching={testsPeriodFetching}/>)
        }
      </div>
    )
  }
}

export default TestsBlock;
