import constants from '../constants/constants';
import merge from 'lodash/merge';

function setFailure(state, error, errorKey, fetchingKey){
	let newState = merge({}, state, {[errorKey]: error});
	delete newState[fetchingKey];
	return newState;
}

function setSuccess(state, newState, errorKey, fetchingKey){
	let _newState = merge({}, state, newState);
	delete _newState[errorKey];
	delete _newState[fetchingKey];
	return _newState;
}

function setTestsPeriod(state, period){
	return merge(state, { selectedTestsPeriod: period });
}

function setCoursesPeriod(state, period){
	return merge(state, { selectedCoursesPeriod: period });
}

export default function(state = {}, action) {
	switch (action.type) {

		case constants.SELECT_TAB:
			return merge({}, state, { selectedTab: action.tab });

		case constants.SELECT_TESTS_RESULT_BY_PERIOD:
			return merge({}, state, { testsPeriodFetching: true });
		case constants.SELECT_TESTS_RESULT_BY_PERIOD_FAILURE:
			return setFailure(state, action.error, 'testsPeriodError', 'testsPeriodFetching');
		case constants.SELECT_TESTS_RESULT_BY_PERIOD_SUCCESS:
			return setTestsPeriod(setSuccess(state, action.response, 'testsPeriodError', 'testsPeriodFetching'), action.period);

		case constants.SELECT_COURSES_RESULT_BY_PERIOD:
			return merge({}, state, { coursesPeriodFetching: true });
		case constants.SELECT_COURSES_RESULT_BY_PERIOD_FAILURE:
			return setFailure(state, action.error, 'coursesPeriodError', 'coursesPeriodFetching');
		case constants.SELECT_COURSES_RESULT_BY_PERIOD_SUCCESS:
			return setCoursesPeriod(setSuccess(state, action.response, 'coursesPeriodError', 'coursesPeriodFetching'), action.period);

		case constants.SELECT_EVENTS_PERIOD:
			return merge({}, state, { eventsFetching: true });
		case constants.SELECT_EVENTS_PERIOD_FAILURE:
			return setFailure(state, action.error, 'eventsError', 'eventsFetching');
		case constants.SELECT_EVENTS_PERIOD_SUCCESS:
			return setSuccess(state, action.response, 'eventsError', 'eventsFetching');

		case constants.SELECT_TESTS_RESULT:
			return merge({}, state, { fetching: true, selectedTab: 'tests' });
		case constants.SELECT_TESTS_RESULT_FAILURE:
			return setFailure(state, action.error, 'error', 'fetching');
		case constants.SELECT_TESTS_RESULT_SUCCESS:
			return setTestsPeriod(setSuccess(state, action.response, 'error', 'fetching'), 'month');

		case constants.SELECT_COURSES_RESULT:
			return merge({}, state, { fetching: true, selectedTab: 'courses' });
		case constants.SELECT_COURSES_RESULT_FAILURE:
			return setFailure(state, action.error, 'error', 'fetching');
		case constants.SELECT_COURSES_RESULT_SUCCESS:
			return setCoursesPeriod(setSuccess(state, action.response, 'error', 'fetching'), 'month');

		case constants.SELECT_ADAPT_RESULT:
			return merge({}, state, { fetching: true, selectedTab: 'adaptation' });
		case constants.SELECT_ADAPT_RESULT_FAILURE:
			return setFailure(state, action.error, 'error', 'fetching');
		case constants.SELECT_ADAPT_RESULT_SUCCESS:
			return setSuccess(state, action.response, 'error', 'fetching');

		case constants.SELECT_REQUESTS_RESULT:
			return merge({}, state, { fetching: true, selectedTab: 'requests' });
		case constants.SELECT_REQUESTS_RESULT_FAILURE:
			return setFailure(state, action.error, 'error', 'fetching');
		case constants.SELECT_REQUESTS_RESULT_SUCCESS:
			return setSuccess(state, action.response, 'error', 'fetching');
		default:
			return state;
	}
}