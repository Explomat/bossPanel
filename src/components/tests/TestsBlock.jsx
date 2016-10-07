import React, { Component, PropTypes } from 'react';
import ChartBlock from '../chart/ChartBlock';

class Tests extends Component {

  render() {
    const { testsResultInfo, selectedTestsPeriod, selectTestsResultByPeriod, testsPeriodFetching } = this.props;

    return (
      <ChartBlock 
        title="Тестирование" 
        chartData={testsResultInfo} 
        selectedPeriod={selectedTestsPeriod}
        onSelectPeriod={selectTestsResultByPeriod}
        fetching={testsPeriodFetching}/>
    )
  }
}

export default Tests;
