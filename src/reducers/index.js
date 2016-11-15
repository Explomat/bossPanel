import { combineReducers } from 'redux';
import adaptResultInfo from './adaptResultInfo';
import coursesResultInfo from './coursesResultInfo';
import requestsInfo from './requestsInfo';
import testsResultInfo from './testsResultInfo';

function app(state = {}, action){
	/*switch (action.type) {

		case constants.GET_ACCESS:
			return assign({}, state, { accessFetching: true });
		case constants.GET_ACCESS_FAILURE:
			return setFailure(state, action.error, 'accessError', 'accessFetching');
		case constants.GET_ACCESS_SUCCESS:
			return setSuccess(state, action.response, 'accessError', 'accessFetching');

		case constants.SELECT_TESTS_RESULT:
			return assign({}, state, { testsResultFetching: true });
		case constants.SELECT_TESTS_RESULT_FAILURE:
			return setFailure(state, action.error, 'testsResultError', 'testsResultFetching');

		case constants.SELECT_COURSES_RESULT:
			return assign({}, state, { coursesResultFetching: true });
		case constants.SELECT_COURSES_RESULT_FAILURE:
			return setFailure(state, action.error, 'coursesResultError', 'coursesResultFetching');

		case constants.SELECT_ADAPT_RESULT:
			return assign({}, state, { adaptResultFetching: true });
		case constants.SELECT_ADAPT_RESULT_FAILURE:
			return setFailure(state, action.error, 'adaptResultError', 'adaptResultFetching');

		case constants.SELECT_REQUESTS_RESULT:
			return assign({}, state, { requestsResultFetching: true});
		case constants.SELECT_REQUESTS_RESULT_FAILURE:

		default:
			return state;
	}*/
}

export default combineReducers({
	adaptation: adaptResultInfo,
	courses: coursesResultInfo,
	requests: requestsInfo,
	tests: testsResultInfo
});