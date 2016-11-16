import { combineReducers } from 'redux';
import app from './app';
import adaptResultInfo from './adaptResultInfo';
import coursesResultInfo from './coursesResultInfo';
import requestsInfo from './requestsInfo';
import testsResultInfo from './testsResultInfo';

export default combineReducers({
	app: app,
	adaptation: adaptResultInfo,
	courses: coursesResultInfo,
	requests: requestsInfo,
	tests: testsResultInfo
});