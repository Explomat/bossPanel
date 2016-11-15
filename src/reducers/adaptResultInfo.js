import constants from '../constants/constants';
import {setSuccess, setFailure} from './utils/setState';
import {sortTable} from './utils/table';
import prepareTableState from '../utils/prepareTableState';
import {keys as adaptationKeys}  from '../utils/adaptationBlockStatuses';
import assign from 'lodash/assign';

function setAdaptDefaults(state){
	let adaptResultInfo = state.adaptResultInfo;
	let preparedState = prepareTableState(adaptResultInfo);
	return assign({}, state, { adaptResultInfo: preparedState, filteredAdaptResultInfo: preparedState, selectedAdaptStatus: adaptationKeys.all });
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
	var newData = sortTable(filteredAdaptResultInfo, data.key, data.isAsc);
	return assign({}, state, {filteredAdaptResultInfo: newData});
}

function changeAdaptStatus(state, status, searchValue){
	let _adaptResultInfo = state.adaptResultInfo;
	if (!_adaptResultInfo) return state;

	const value = searchValue ? searchValue.toLowerCase() : '';
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

export default function adaptResultInfo(state = {
	adaptResultInfo: [],
	filteredAdaptResultInfo: [],
	error: null,
	isFetching: false,
	selectedAdaptStatus: adaptationKeys.all

}, action) {
	switch (action.type) {
		case constants.SELECT_ADAPT_RESULT:
			return assign({}, state, { isFetching: true });
		case constants.SELECT_ADAPT_RESULT_FAILURE:
			return setFailure(state, action.error, 'error', 'isFetching');
		case constants.SELECT_ADAPT_RESULT_SUCCESS:
			return setAdaptDefaults(setSuccess(state, action.response, 'error', 'isFetching'));
		case constants.SEARCH_ADAPT_DATA:
			return searchAdaptData(state, action.value);
		case constants.SORT_ADAPT_DATA:
			return sortAdaptData(state, action.payload);
		case constants.CHANGE_ADAPT_STATUS:
			return changeAdaptStatus(state, action.status, action.searchValue);

		default: 
			return state;
	}
}

