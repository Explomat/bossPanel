import React, { Component, PropTypes } from 'react';

import Tests from './Tests';
import Courses from './Courses';
import Adaptation from './Adaptation';
import Requests from './Requests';
import Reports from './Reports';

const Container = () => {
	return (
		<div>
	      <div className="boss-panel__block boss-panel__block--tests-courses">
	        <div className="boss-panel__description">Тесты и курсы</div>
        	<Tests />
        	<Courses />
	      </div>
	      <div className="boss-panel__block boss-panel__block--reports">
	      	<div className="boss-panel__description">Отчеты</div>
	      	<Reports />
	      </div>
	      <div className="boss-panel__block">
	        <div className="boss-panel__description">Адаптация</div>
	        <Adaptation />
	      </div>
	      <div className="boss-panel__block">
	        <div className="boss-panel__description">Заявки</div>
	        <Requests />
	      </div>
      </div>
    )
}

export default Container;