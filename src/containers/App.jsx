import React, { Component, PropTypes } from 'react';
import * as actionCreators from '../actions';
import omit from 'lodash/omit';

import TestsBlock from '../components/tests/TestsBlock';
import CoursesBlock from '../components/courses/CoursesBlock';
import AdaptationBlock from '../components/adaptation/AdaptationBlock';
import RequestsBlock from '../components/requests/RequestsBlock';
import {AlertDanger} from '../components/modules/alert';

import { connect } from 'react-redux';

class App extends Component {

  getBlocksMarkup(){
    return ([
      <div className="boss-panel__block">
        <div className="boss-panel__description">Тесты и курсы</div>
        <TestsBlock {...this.props}/>
        <CoursesBlock {...this.props}/>
      </div>,
      <div className="boss-panel__block">
        <div className="boss-panel__description">Адаптация</div>
        <AdaptationBlock {...this.props}/>
      </div>,
      <div className="boss-panel__block">
        <div className="boss-panel__description">Заявки</div>
        <RequestsBlock {...this.props}/>
      </div>
    ])
  }

  render(){
    const { children } = this.props;
    const { tests, courses, adaptation, requests } = this.props;
    return (
      <div className="boss-panel">
        <div className="boss-panel__container">
          <div className="boss-panel__block">
            <div className="boss-panel__description">Тесты и курсы</div>
            <TestsBlock {...tests} {...omit(this.props, ['tests'])}/>
            <CoursesBlock {...courses} {...omit(this.props, ['courses'])}/>
          </div>,
          <div className="boss-panel__block">
            <div className="boss-panel__description">Адаптация</div>
            <AdaptationBlock {...adaptation} {...omit(this.props, ['adaptation'])}/>
          </div>,
          <div className="boss-panel__block">
            <div className="boss-panel__description">Заявки</div>
            <RequestsBlock {...requests} {...omit(this.props, ['requests'])}/>
          </div>
          {children}
        </div>
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.element
}

function mapStateToProps(state) {
  return {...state};
}

/*function mapDispatchToProps(dispatch) {
  let actions = bindActionCreators(actionCreators, dispatch);
  return { ...actions, dispatch };
}*/

export default connect(mapStateToProps, actionCreators)(App)
