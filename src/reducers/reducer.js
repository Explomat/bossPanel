import constants from '../constants/constants';
import {Map} from 'immutable';

function setFailure(state, error, errorKey, fetchingKey){
	return state.set(errorKey, error).remove(fetchingKey);
}

function setSuccess(state, newState, errorKey, fetchingKey){
	return state.merge(newState).remove(errorKey).remove(fetchingKey);
}

export default function(state = Map(), action) {
	switch (action.type) {
		case constants.GET_STATE:
			return state.set('fetching', true);
		case constants.GET_STATE_FAILURE:
			return setFailure(state, action.error, 'error', 'fetching');
		case constants.GET_STATE_SUCCESS:
			return setSuccess(state, action.response, 'error', 'fetching');

		case constants.SELECT_TESTS_PERIOD:
			return state.set('testsFetching', true);
		case constants.SELECT_TESTS_PERIOD_FAILURE:
			return setFailure(state, action.error, 'testsError', 'testsFetching');
		case constants.SELECT_TESTS_PERIOD_SUCCESS:
			return setSuccess(state, action.response, 'testsError', 'testsFetching');

		case constants.SELECT_COURSES_PERIOD:
			return state.set('coursesFetching', true);
		case constants.SELECT_COURSES_PERIOD_FAILURE:
			return setFailure(state, action.error, 'coursesError', 'coursesFetching');
		case constants.SELECT_COURSES_PERIOD_SUCCESS:
			return setSuccess(state, action.response, 'coursesError', 'coursesFetching');

		case constants.SELECT_EVENTS_PERIOD:
			return state.set('eventsFetching', true);
		case constants.SELECT_EVENTS_PERIOD_FAILURE:
			return setFailure(state, action.error, 'eventsError', 'eventsFetching');
		case constants.SELECT_EVENTS_PERIOD_SUCCESS:
			return setSuccess(state, action.response, 'eventsError', 'eventsFetching');

		case constants.SELECT_ADAPTATION_PERIOD:
			return state.set('adaptationFetching', true);
		case constants.SELECT_ADAPTATION_PERIOD_FAILURE:
			return setFailure(state, action.error, 'adaptationError', 'adaptationFetching');
		case constants.SELECT_ADAPTATION_PERIOD_SUCCESS:
			return setSuccess(state, action.response, 'adaptationError', 'adaptationFetching');

		case constants.SELECT_LIBRARY_MATERIALS_PERIOD:
			return state.set('libraryMaterialsFetching', true);
		case constants.SELECT_LIBRARY_MATERIALS_PERIOD_FAILURE:
			return setFailure(state, action.error, 'libraryMaterialsError', 'libraryMaterialsFetching');
		case constants.SELECT_LIBRARY_MATERIALS_PERIOD_SUCCESS:
			return setSuccess(state, action.response, 'libraryMaterialsError', 'libraryMaterialsFetching');
	}
	return state;
}