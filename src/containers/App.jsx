import React, { Component, PropTypes } from 'react';
import * as actionCreators from '../actions/actionCreators';

import TestsBlock from '../components/tests/TestsBlock';
import CoursesBlock from '../components/courses/CoursesBlock';
import AdaptationBlock from '../components/adaptation/AdaptationBlock';
import RequestsBlock from '../components/requests/RequestsBlock';

import { connect } from 'react-redux';

class App extends Component {

  render(){
    let dispatch = this.props.dispatch;
    const { selectedTab, fetching, error, children } = this.props;

    return (
      <div className="boss-panel">
        <div className="boss-panel__container">
          <div className="boss-panel__block">
            <div className="boss-panel__description">Тесты и курсы</div>
            <TestsBlock {...this.props}/>
            <CoursesBlock {...this.props}/>
          </div>
          <div className="boss-panel__block">
            <div className="boss-panel__description">Адаптация</div>
            <AdaptationBlock {...this.props}/>
          </div>
           <div className="boss-panel__block">
            <div className="boss-panel__description">Заявки</div>
            <RequestsBlock {...this.props}/>
          </div>
          {children}
        </div>
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.node
}

function mapStateToProps(state) {
  return {...state};
}

export default connect(mapStateToProps, actionCreators)(App)
