import 'babel-polyfill';
import './styles';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducers from './reducers';
import { getAccess } from './actions';
import thunk from 'redux-thunk';
//import remoteActionMiddleware from './middleware/remoteActionMiddleware';
import App from './containers/App';
import config from './config';

const store = createStore(
  reducers,
  applyMiddleware(thunk)
);

/*const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducers);*/

/*store.dispatch(loadTests('month'));
store.dispatch(loadCourses('month'));
store.dispatch(loadAdaptation());
store.dispatch(loadRequests())*/

store.dispatch(getAccess());

const routes = <Route path="/" component={App}/>;

ReactDOM.render(
	<Provider store={store}>
 		<Router history={hashHistory}>{routes}</Router>
 	</Provider>,
	document.getElementById(config.dom.appId)
);