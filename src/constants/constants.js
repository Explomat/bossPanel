import keyMirror from 'keyMirror';
import createRemoteActions from './utils/createRemoteActions';
import merge from 'lodash/merge';

let remoteConstants = createRemoteActions([
	'GET_ACCESS', 
	'SELECT_TESTS_RESULT_BY_PERIOD',
	'SELECT_COURSES_RESULT_BY_PERIOD',
	'SELECT_TESTS_RESULT',
	'SELECT_COURSES_RESULT',
	'SELECT_ADAPT_RESULT',
	'SELECT_REQUESTS_RESULT'
]);

const constants = keyMirror({
	SEARCH_ADAPT_DATA: null,
	SORT_ADAPT_DATA: null,
	CHANGE_ADAPT_STATUS: null,

	SEARCH_REQUESTS_DATA: null,
	SORT_REQUESTS_DATA: null
});

export default merge(remoteConstants, constants)