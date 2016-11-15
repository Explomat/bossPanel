import React, { Component } from 'react';
import ChartBlock from '../chart/ChartBlock';
import {AlertDanger} from '../modules/alert';

import './tests-block.scss';

class TestsBlock extends Component {

  render() {
    const { isFetching, isFetchingByPeriod, error } = this.props;
    const { testsResultInfo, period, loadTestsByPeriod } = this.props;

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
}

export default TestsBlock;
