import {get} from '../utils/ajax';
import config from '../config';
import constants from '../constants';

function fetchAccess(){
	return {
		type: constants.GET_ACCESS
	}
}

function receiveAccess(response){
	return {
		type: constants.GET_ACCESS_SUCCESS,
		response
	}
}

function errorAccess(error){
	return {
		type: constants.GET_ACCESS_FAILURE,
		error
	}
}

export function getAccess(){
	return dispatch => {
		dispatch(fetchAccess());

		let path = config.url.createPath({server_name: 'Test', action_name: 'getAccess'});
		get(path, true)
		.then(resp => JSON.parse(resp))
		.then(resp => {
			if (resp.error){
				dispatch(errorAccess(resp.error))
			}
			else{
				dispatch(receiveAccess(resp))
			}
		})
		.catch(e => {
			dispatch(errorAccess(e))
		})
	}
}