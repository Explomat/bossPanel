import "babel-polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducers/reducer';
import {getState} from './actions/actionCreators';
import remoteActionMiddleware from './middleware/remoteActionMiddleware';
import App from './containers/App';
import Test from './containers/Test';
import config from './config';

const createStoreWithMiddleware = applyMiddleware(remoteActionMiddleware)(createStore);
const store = createStoreWithMiddleware(reducer);

const routes = <Route path="/" component={App} onEnter={store.dispatch.bind(store, getState())}>
	<Route path="/test" component={Test} />
</Route>;

ReactDOM.render(
	<Provider store={store}>
 		<Router history={hashHistory}>{routes}</Router>
 	</Provider>,
	document.getElementById(config.dom.appId)
);