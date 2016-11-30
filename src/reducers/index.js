import { combineReducers } from 'redux';
import app from './app';
import adaptResultInfo from './adaptResultInfo';
import coursesResultInfo from './coursesResultInfo';
import requestsInfo from './requestsInfo';
import testsResultInfo from './testsResultInfo';
import reportsInfo from './reportsInfo';

export default combineReducers({
	app: app,
	tests: testsResultInfo,
	courses: coursesResultInfo,
	reports: reportsInfo,
	adaptation: adaptResultInfo,
	requests: requestsInfo
});