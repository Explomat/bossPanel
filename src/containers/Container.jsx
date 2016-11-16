import React, { Component, PropTypes } from 'react';

import TestsBlock from '../components/tests/TestsBlock';
import CoursesBlock from '../components/courses/CoursesBlock';
import AdaptationBlock from '../components/adaptation/AdaptationBlock';
import RequestsBlock from '../components/requests/RequestsBlock';

import omit from 'lodash/omit';

class Container extends Component {

	componentWillMount(){
		const {loadTests, loadCourses, loadAdaptation, loadRequests} = this.props;
		loadTests('month');
		loadCourses('month');
		loadAdaptation();
		loadRequests();
	}

	componentDidMount(){
		/*const {loadTests, loadCourses, loadAdaptation, loadRequests} = this.props;
		loadTests('month');
		loadCourses('month');
		loadAdaptation();
		loadRequests();*/
	}

	render(){
		const { tests, courses, adaptation, requests } = this.props;
		return (
			<div>
		      <div className="boss-panel__block">
		        <div className="boss-panel__description">Тесты и курсы</div>
		        <TestsBlock {...tests} {...omit(this.props, ['tests'])}/>
		        <CoursesBlock {...courses} {...omit(this.props, ['courses'])}/>
		      </div>
		      <div className="boss-panel__block">
		        <div className="boss-panel__description">Адаптация</div>
		        <AdaptationBlock {...adaptation} {...omit(this.props, ['adaptation'])}/>
		      </div>
		      <div className="boss-panel__block">
		        <div className="boss-panel__description">Заявки</div>
		        <RequestsBlock {...requests} {...omit(this.props, ['requests'])}/>
		      </div>
	      </div>
	    )
	}
}


export default Container;