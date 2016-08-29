import "babel-polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducers/reducer';
import {setState} from './actions/actionCreators';
import remoteActionMiddleware from './middleware/remoteActionMiddleware';
import App from './containers/App';
import config from './config';

const createStoreWithMiddleware = applyMiddleware(remoteActionMiddleware)(createStore);
const store = createStoreWithMiddleware(reducer);

function _setState() {
	store.dispatch(setState())
}

const routes = <Route path="/" component={App} onEnter={_setState}></Route>;

ReactDOM.render(
	<Provider store={store}>
 		<Router history={hashHistory}>{routes}</Router>
 	</Provider>,
	document.getElementById(config.dom.appId)
);