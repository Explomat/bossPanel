import React from 'react';
import {Link} from 'react-router';
import cx from 'classnames';

import './side-bar.scss';

class SideBar extends React.Component {

	_getTabClasses(tabName){
		const {selectedTab} = this.props;

		return cx("side-bar__tab-label", {
			"side-bar__tab-label--selected": selectedTab === tabName
		});
	}

	render(){
		const {selectedTab} = this.props;
		return (
			<aside className="side-bar">
				<div className="side-bar__header">
					<span>test</span>
				</div>
				<div className="side-bar__body">
					<Link className={this._getTabClasses("tests")} to="/tests">Тесты</Link>
					<Link className={this._getTabClasses("courses")} to="/courses">Курсы</Link>
					<Link className={this._getTabClasses("adaptation")} to="/adaptation">Адаптация</Link>
					<Link className={this._getTabClasses("requests")} to="/requests">Заявки</Link>
				</div>
			</aside>
		);
	}
};

export default SideBar;