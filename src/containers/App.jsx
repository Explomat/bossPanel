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
    const { children, fetching, error } = this.props;
    const { selectTestsPeriod, selectCoursesPeriod, selectEventsPeriod, selectAdaptationPeriod, selectLibraryMaterialsPeriod } = this.props;
    if (fetching) {
      return <h2>Loading...</h2>
    }

    return (
      <div>
        {error ? <h2>{error}</h2> : 
          <div>
            <ChartBlock title="Тестирование" chartData={chartData.tests} onSelectPeriod={selectTestsPeriod}/>
            <ChartBlock title="Курсы" chartData={chartData.courses} onSelectPeriod={selectCoursesPeriod}/>
            <ChartBlock title="Мероприятия" chartData={chartData.events} onSelectPeriod={selectEventsPeriod}/>
            <ChartBlock title="Адаптация" chartData={chartData.adaptation} onSelectPeriod={selectAdaptationPeriod}/>
            <ChartBlock title="Материалы библиотеки" chartData={chartData.libraryMaterials} onSelectPeriod={selectLibraryMaterialsPeriod}/>
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
    fetching: state.get('fetching'),
    error: state.get('error')
  }
}

export default connect(mapStateToProps, actionCreators)(App)
