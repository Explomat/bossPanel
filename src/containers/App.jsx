import React, { Component, PropTypes } from 'react';
import ChartBlock from '../components/ChartBlock';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';

var chartData = {

  tests: [
    {
      value: 5,
      label: "Проигнорировано"
    },
    {
      value: 2,
      label: "Положительно"
    },
    {
      value: 3,
      label: "Отрицательно"
    }
  ],
  courses: [
    {
      value: 3,
      label: "Проигнорировано"
    },
    {
      value: 1,
      label: "Положительно"
    },
    {
      value: 6,
      label: "Отрицательно"
    }
  ],
  events: [
    {
      value: 1,
      label: "Проигнорировано"
    },
    {
      value: 2,
      label: "Положительно"
    },
    {
      value: 7,
      label: "Отрицательно"
    }
  ],
  adaptation: [
    {
      value: 7,
      label: "Проигнорировано"
    },
    {
      value: 1,
      label: "Положительно"
    },
    {
      value: 2,
      label: "Отрицательно"
    }
  ],
  libraryMaterials: [
    {
      value: 7,
      label: "Проигнорировано"
    },
    {
      value: 1,
      label: "Положительно"
    },
    {
      value: 2,
      label: "Отрицательно"
    }
  ]
}

class App extends Component {

  render() {
    const { tests, courses, children, fetching, error } = this.props;
    const { selectTestsPeriod, selectCoursesPeriod, selectEventsPeriod, selectAdaptationPeriod, selectLibraryMaterialsPeriod } = this.props;
    if (fetching) {
      return <h2>Loading...</h2>
    }

    return (
      <div>
        {error ? <h2>{error}</h2> : 
          <div>
            <ChartBlock title="Тестирование" chartData={tests} onSelectPeriod={selectTestsPeriod}/>
            <ChartBlock title="Курсы" chartData={courses} onSelectPeriod={selectCoursesPeriod}/>
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
    tests: state.tests,
    courses: state.courses
  }
}

export default connect(mapStateToProps, actionCreators)(App)
