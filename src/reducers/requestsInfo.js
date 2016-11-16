import constants from '../constants/constants';
import {setSuccess, setFailure} from './utils/setState';
import {sortTable} from './utils/table';
import prepareTableState from '../utils/prepareTableState';
import assign from 'lodash/assign';

function setRequestsDefaults(state){
	let requestsInfo = state.requestsInfo;
	let preparedState = prepareTableState(requestsInfo);
	return assign({}, state, { requestsInfo: preparedState, filteredRequestsInfo: preparedState });
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
	var newData = sortTable(filteredRequestsInfo, data.key, data.isAsc);
	return assign({}, state, {filteredRequestsInfo: newData});
}

export default function requestsInfo(state = {
	requestsInfo: [],
	filteredRequestsInfo: [],
	error: null,
	isFetching: true
}, action) {
	switch (action.type) {
		case constants.SELECT_REQUESTS_RESULT:
			return assign({}, state, { isFetching: true});
		case constants.SELECT_REQUESTS_RESULT_FAILURE:
			return setFailure(state, action.error, 'error', 'isFetching');
		case constants.SELECT_REQUESTS_RESULT_SUCCESS:
			return setRequestsDefaults(setSuccess(state, action.response, 'error', 'isFetching'));
		case constants.SEARCH_REQUESTS_DATA:
			return searchRequestsData(state, action.value);
		case constants.SORT_REQUESTS_DATA:
			return sortRequestsData(state, action.payload);

		default: 
			return state;
	}
}

