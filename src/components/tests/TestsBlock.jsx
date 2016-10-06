import React, { Component, PropTypes } from 'react';
import ChartBlock from '../chart/ChartBlock';

class Tests extends Component {

  render() {
    const { testsResultInfo, selectedTestsPeriod, selectTestsResultByPeriod, testsFetching } = this.props;

    return (
      <ChartBlock 
        title="Тестирование" 
        chartData={testsResultInfo} 
        selectedPeriod={selectedTestsPeriod}
        onSelectPeriod={selectTestsResultByPeriod}
        fetching={testsFetching}/>
    )
  }
}

export default Tests;
