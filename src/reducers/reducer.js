import constants from '../constants/constants';
import {assign} from 'lodash';
import {Map} from 'immutable';

function getState(state){
	return assign(state, {fetching: true});
}

function setFailure(state, error, errorKey, fetchingKey){
	let newState = assign({}, state, {[errorKey]: error});
	delete newState[fetchingKey];
	return newState;
	//return state.set(errorKey, error).remove(fetchingKey);
}

function setSuccess(state, newState, errorKey, fetchingKey){
	let _newState = assign({}, state, newState);
	delete _newState[errorKey];
	delete _newState[fetchingKey];
	return _newState;
	//return state.merge(newState).remove(errorKey).remove(fetchingKey);
}

function setDefaultPeriods(state){
	return assign(state, {selectedTestsPeriod: 'month', selectedCoursesPeriod: 'month'});
}

function setTestsPeriod(state, period){
	return assign(state, { selectedTestsPeriod: period });
}

function setCoursesPeriod(state, period){
	return assign(state, { selectedCoursesPeriod: period });
}

export default function(state = {}, action) {
	switch (action.type) {
		case constants.GET_STATE:
			return getState(state);
		case constants.GET_STATE_FAILURE:
			return setFailure(state, action.error, 'error', 'fetching');
		case constants.GET_STATE_SUCCESS:
			return setDefaultPeriods(setSuccess(state, action.response, 'error', 'fetching'));

		case constants.SELECT_TESTS_RESULT_BY_PERIOD:
			return assign({}, state, {testsFetching: true});
		case constants.SELECT_TESTS_RESULT_BY_PERIOD_FAILURE:
			return setFailure(state, action.error, 'testsError', 'testsFetching');
		case constants.SELECT_TESTS_RESULT_BY_PERIOD_SUCCESS:
			return setTestsPeriod(setSuccess(state, action.response, 'testsError', 'testsFetching'), action.period);

		case constants.SELECT_COURSES_RESULT_BY_PERIOD:
			return assign({}, state, {coursesFetching: true});
		case constants.SELECT_COURSES_RESULT_BY_PERIOD_FAILURE:
			return setFailure(state, action.error, 'coursesError', 'coursesFetching');
		case constants.SELECT_COURSES_RESULT_BY_PERIOD_SUCCESS:
			return setCoursesPeriod(setSuccess(state, action.response, 'coursesError', 'coursesFetching'), action.period);

		case constants.SELECT_EVENTS_PERIOD:
			return assign({}, state, {eventsFetching: true});
		case constants.SELECT_EVENTS_PERIOD_FAILURE:
			return setFailure(state, action.error, 'eventsError', 'eventsFetching');
		case constants.SELECT_EVENTS_PERIOD_SUCCESS:
			return setSuccess(state, action.response, 'eventsError', 'eventsFetching');

		case constants.SELECT_ADAPTATION_PERIOD:
			return assign({}, state, {adaptationFetching: true});
		case constants.SELECT_ADAPTATION_PERIOD_FAILURE:
			return setFailure(state, action.error, 'adaptationError', 'adaptationFetching');
		case constants.SELECT_ADAPTATION_PERIOD_SUCCESS:
			return setSuccess(state, action.response, 'adaptationError', 'adaptationFetching');

		case constants.SELECT_LIBRARY_MATERIALS_PERIOD:
			return assign({}, state, {libraryMaterialsFetching: true});
		case constants.SELECT_LIBRARY_MATERIALS_PERIOD_FAILURE:
			return setFailure(state, action.error, 'libraryMaterialsError', 'libraryMaterialsFetching');
		case constants.SELECT_LIBRARY_MATERIALS_PERIOD_SUCCESS:
			return setSuccess(state, action.response, 'libraryMaterialsError', 'libraryMaterialsFetching');
		default:
			return state;
	}
}