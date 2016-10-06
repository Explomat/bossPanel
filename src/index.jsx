import 'babel-polyfill';
import './styles';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducers/reducer';
import {getState} from './actions/actionCreators';
import remoteActionMiddleware from './middleware/remoteActionMiddleware';
import App from './containers/App';
import Tests from './containers/Tests';
import Courses from './containers/Courses';
import Adaptation from './containers/Adaptation';
import Requests from './containers/Requests';
import config from './config';

const createStoreWithMiddleware = applyMiddleware(remoteActionMiddleware)(createStore);
const store = createStoreWithMiddleware(reducer);

const routes = <Route path="/" component={App} onEnter={store.dispatch.bind(store, getState())}>
	<IndexRoute component={Tests}/>
	<Route path="/tests" component={Tests} />
	<Route path="/courses" component={Courses} />
	<Route path="/adaptation" component={Adaptation} />
	<Route path="/requests" component={Requests} />
</Route>;

ReactDOM.render(
	<Provider store={store}>
 		<Router history={hashHistory}>{routes}</Router>
 	</Provider>,
	document.getElementById(config.dom.appId)
);