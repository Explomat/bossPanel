import React, { Component, PropTypes } from 'react';
import ChartBlock from '../components/chart/ChartBlock';
import AdaptationBlock from '../components/adaptation/AdaptationBlock';
import RequestsBlock from '../components/requests/RequestsBlock';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';

class App extends Component {

  render() {
    const { testsResultInfo, coursesResultInfo, adaptResultInfo, requestsInfo } = this.props;
    const { children, fetching, error } = this.props;
    const { selectTestsResultByPeriod, selectCoursesResultByPeriod } = this.props;
    const { selectedTestsPeriod, selectedCoursesPeriod } = this.props;
    const { testsFetching, coursesFetching } = this.props;
    if (fetching) {
      return <h2>Loading...</h2>
    }

    return (
      <div>
        {error ? <h2>{error}</h2> : 
          <div>
            <ChartBlock 
              title="Тестирование" 
              chartData={testsResultInfo} 
              selectedPeriod={selectedTestsPeriod} 
              onSelectPeriod={selectTestsResultByPeriod}
              fetching={testsFetching}/>
            <ChartBlock 
              title="Курсы" 
              chartData={coursesResultInfo} 
              selectedPeriod={selectedCoursesPeriod} 
              onSelectPeriod={selectCoursesResultByPeriod}
              fetching={coursesFetching}/>
            <AdaptationBlock data={adaptResultInfo}/>
            <RequestsBlock data={requestsInfo} />
          </div>
        }
        {children}
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.node
}

function mapStateToProps(state) {
  return {
    fetching: state.fetching,
    error: state.error,
    selectedTestsPeriod: state.selectedTestsPeriod,
    selectedCoursesPeriod: state.selectedCoursesPeriod,
    testsFetching: state.testsFetching,
    coursesFetching: state.coursesFetching,
    testsResultInfo: state.testsResultInfo,
    coursesResultInfo: state.coursesResultInfo,
    adaptResultInfo: state.adaptResultInfo,
    requestsInfo: state.requestsInfo
  }
}

export default connect(mapStateToProps, actionCreators)(App)
