import {get} from '../utils/ajax';
import config from '../config';
import constants from '../constants';


function fetchAdaptation() {
	return {
		type: constants.SELECT_ADAPT_RESULT
  	}
}

function receiveAdaptation(response) {
	return {
		type: constants.SELECT_ADAPT_RESULT_SUCCESS,
		response
  	}
}

function errorAdaptation(error){
	return {
		type: constants.SELECT_ADAPT_RESULT_FAILURE,
		error
  	}
}

export function loadAdaptation(){
	return dispatch => {
		dispatch(fetchAdaptation());

		let path = config.url.createPath({server_name: 'Test', action_name: 'selectAdaptResult'});
		get(path, true)
		.then(resp => JSON.parse(resp))
		.then(resp => {
			if (resp.error){
				dispatch(errorAdaptation(resp.error))
			}
			else {
				dispatch(receiveAdaptation(resp))
			}
		})
		.catch(e => {
			dispatch(errorAdaptation(e))
		})
	}
}

export function searchAdaptData(value){
	return {
		type: constants.SEARCH_ADAPT_DATA,
		value
	}
}

export function sortAdaptData(payload){
	return {
		type: constants.SORT_ADAPT_DATA,
		payload
	}
}

export function changeAdaptStatus(status, searchValue){
	return {
		type: constants.CHANGE_ADAPT_STATUS,
		status,
		searchValue
	}
}
