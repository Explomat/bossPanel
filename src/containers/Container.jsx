import React, { Component, PropTypes } from 'react';

import Tests from './Tests';
import Courses from './Courses';
import Adaptation from './Adaptation';
import Requests from './Requests';

const Container = () => {
	return (
		<div>
	      <div className="boss-panel__block">
	        <div className="boss-panel__description">Тесты и курсы</div>
	        <Tests />
	        <Courses />
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