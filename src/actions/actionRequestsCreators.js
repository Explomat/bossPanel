import {get} from '../utils/ajax';
import config from '../config';
import constants from '../constants';

function fetchRequests() {
	return {
		type: constants.SELECT_REQUESTS_RESULT
  	}
}

function receiveRequests(response) {
	return {
		type: constants.SELECT_REQUESTS_RESULT_SUCCESS,
		response
  	}
}

function errorRequests(error){
	return {
		type: constants.SELECT_REQUESTS_RESULT_FAILURE,
		error
  	}
}

export function loadRequests(){
	return dispatch => {
		dispatch(fetchRequests());

		let path = config.url.createPath({server_name: 'Test', action_name: 'selectRequestsResult'});
		get(path, true)
		.then(resp => JSON.parse(resp))
		.then(resp => {
			if (resp.error){
				dispatch(errorRequests(resp.error))
			}
			else {
				dispatch(receiveRequests(resp))
			}
		})
		.catch(e => {
			dispatch(errorRequests(e))
		})
	}
}

export function searchRequestsData(value){
	return {
		type: constants.SEARCH_REQUESTS_DATA,
		value
	}
}

export function sortRequestsData(payload){
	return {
		type: constants.SORT_REQUESTS_DATA,
		payload
	}
}