import constants from '../constants/constants';
import prepareTableState from '../utils/prepareTableState';
import {keys as adaptationKeys}  from '../utils/adaptationBlockStatuses';
import assign from 'lodash/assign';
import orderBy from 'lodash/orderBy';

function _sortTable(array, key, isAsc){
	const ascending = isAsc === 'true' ? 'asc' : 'desc';
	return orderBy(array, [key], [ascending]);
}

function setFailure(state, error, errorKey, fetchingKey){
	let newState = assign({}, state, {[errorKey]: error});
	delete newState[fetchingKey];
	return newState;
}

function setSuccess(state, newState, errorKey, fetchingKey){
	let _newState = assign({}, state, newState);
	delete _newState[errorKey];
	delete _newState[fetchingKey];
	return _newState;
}

function setTestsPeriod(state, period){
	return assign(state, { selectedTestsPeriod: period });
}

function setCoursesPeriod(state, period){
	return assign(state, { selectedCoursesPeriod: period });
}

function setAdaptDefaults(state){
	let adaptResultInfo = state.adaptResultInfo;
	let preparedState = prepareTableState(adaptResultInfo);
	return assign({}, state, { adaptResultInfo: preparedState, filteredAdaptResultInfo: preparedState, selectedAdaptStatus: adaptationKeys.all });
}

function setRequestsDefaults(state){
	let requestsInfo = state.requestsInfo;
	let preparedState = prepareTableState(requestsInfo);
	return assign({}, state, { requestsInfo: preparedState, filteredRequestsInfo: preparedState });
}


function searchAdaptData(state, value){
	let _adaptResultInfo = state.adaptResultInfo;
	let status = state.selectedAdaptStatus;
	if (!_adaptResultInfo) return state;

	let filteredStatusAdaptResultInfo = _adaptResultInfo;
	if (status !== adaptationKeys.all) {
		filteredStatusAdaptResultInfo = _adaptResultInfo.filter(item => {
			return item.status === status;
		});
	}

	value = value.toLowerCase();
	let filteredAdaptResultInfo = filteredStatusAdaptResultInfo.filter(item => {
		const name = item.personFullname.toLowerCase();
		return ~name.indexOf(value);
	});
	return assign({}, state, {filteredAdaptResultInfo: filteredAdaptResultInfo});
}

function sortAdaptData(state, payload){

	let filteredAdaptResultInfo = state.filteredAdaptResultInfo;
	if (!filteredAdaptResultInfo) return state;

	var data = JSON.parse(payload);
	var newData = _sortTable(filteredAdaptResultInfo, data.key, data.isAsc);
	return assign({}, state, {filteredAdaptResultInfo: newData});
}

function changeAdaptStatus(state, status, searchValue){
	let _adaptResultInfo = state.adaptResultInfo;
	if (!_adaptResultInfo) return state;

	const value = searchValue.toLowerCase();
	let filteredAdaptResultInfo = _adaptResultInfo.filter(item => {
		const name = item.personFullname.toLowerCase();
		return ~name.indexOf(value);
	});

	let filteredStatusAdaptResultInfo = filteredAdaptResultInfo;
	if (status !== adaptationKeys.all) {
		filteredStatusAdaptResultInfo = filteredAdaptResultInfo.filter(item => {
			return item.status === status;
		});
	}

	return assign({}, state, {selectedAdaptStatus: status, filteredAdaptResultInfo: filteredStatusAdaptResultInfo});
}

function searchRequestsData(state, value){
	let _requestsInfo = state.requestsInfo;
	if (!_requestsInfo) return state;

	value = value.toLowerCase();
	let filteredRequestsInfo = _requestsInfo.filter(item => {
		const name = item.personFullname.toLowerCase();
		const code = item.code.toLowerCase();
		const objectName = item.objectName.toLowerCase();
		return (~name.indexOf(value) || ~code.indexOf(value) || ~objectName.indexOf(value));
	});
	return assign({}, state, {filteredRequestsInfo: filteredRequestsInfo});
}

function sortRequestsData(state, payload){

	let filteredRequestsInfo = state.filteredRequestsInfo;
	if (!filteredRequestsInfo) return state;

	var data = JSON.parse(payload);
	var newData = _sortTable(filteredRequestsInfo, data.key, data.isAsc);
	return assign({}, state, {filteredRequestsInfo: newData});
}

export default function(state = {}, action) {
	switch (action.type) {

		case constants.SELECT_TAB:
			return assign({}, state, { selectedTab: action.tab });

		case constants.SELECT_TESTS_RESULT_BY_PERIOD:
			return assign({}, state, { testsPeriodFetching: true });
		case constants.SELECT_TESTS_RESULT_BY_PERIOD_FAILURE:
			return setFailure(state, action.error, 'testsPeriodError', 'testsPeriodFetching');
		case constants.SELECT_TESTS_RESULT_BY_PERIOD_SUCCESS:
			return setTestsPeriod(setSuccess(state, action.response, 'testsPeriodError', 'testsPeriodFetching'), action.period);

		case constants.SELECT_COURSES_RESULT_BY_PERIOD:
			return assign({}, state, { coursesPeriodFetching: true });
		case constants.SELECT_COURSES_RESULT_BY_PERIOD_FAILURE:
			return setFailure(state, action.error, 'coursesPeriodError', 'coursesPeriodFetching');
		case constants.SELECT_COURSES_RESULT_BY_PERIOD_SUCCESS:
			return setCoursesPeriod(setSuccess(state, action.response, 'coursesPeriodError', 'coursesPeriodFetching'), action.period);

		case constants.SELECT_TESTS_RESULT:
			return assign({}, state, { testsResultFetching: true });
		case constants.SELECT_TESTS_RESULT_FAILURE:
			return setFailure(state, action.error, 'testsResultError', 'testsResultFetching');
		case constants.SELECT_TESTS_RESULT_SUCCESS:
			return setTestsPeriod(setSuccess(state, action.response, 'testsResultError', 'testsResultFetching'), 'month');

		case constants.SELECT_COURSES_RESULT:
			return assign({}, state, { coursesResultFetching: true });
		case constants.SELECT_COURSES_RESULT_FAILURE:
			return setFailure(state, action.error, 'coursesResultError', 'coursesResultFetching');
		case constants.SELECT_COURSES_RESULT_SUCCESS:
			return setCoursesPeriod(setSuccess(state, action.response, 'coursesResultError', 'coursesResultFetching'), 'month');

		case constants.SELECT_ADAPT_RESULT:
			return assign({}, state, { adaptResultFetching: true });
		case constants.SELECT_ADAPT_RESULT_FAILURE:
			return setFailure(state, action.error, 'adaptResultError', 'adaptResultFetching');
		case constants.SELECT_ADAPT_RESULT_SUCCESS:
			return setAdaptDefaults(setSuccess(state, action.response, 'adaptResultError', 'adaptResultFetching'));
		case constants.SEARCH_ADAPT_DATA:
			return searchAdaptData(state, action.value);
		case constants.SORT_ADAPT_DATA:
			return sortAdaptData(state, action.payload);
		case constants.CHANGE_ADAPT_STATUS:
			return changeAdaptStatus(state, action.status, action.searchValue);

		case constants.SELECT_REQUESTS_RESULT:
			return assign({}, state, { requestsResultFetching: true, selectedTab: 'requests' });
		case constants.SELECT_REQUESTS_RESULT_FAILURE:
			return setFailure(state, action.error, 'requestsResultError', 'requestsResultFetching');
		case constants.SELECT_REQUESTS_RESULT_SUCCESS:
			return setRequestsDefaults(setSuccess(state, action.response, 'requestsResultError', 'requestsResultFetching'));
		case constants.SEARCH_REQUESTS_DATA:
			return searchRequestsData(state, action.value);
		case constants.SORT_REQUESTS_DATA:
			return sortRequestsData(state, action.payload);
		default:
			return state;
	}
}