import {get} from '../utils/ajax';
import config from '../config';
import constants from '../constants'

function fetchReports() {
	return {
		type: constants.SELECT_REPORTS
  	}
}

function receiveReports(response, period) {
	return {
		type: constants.SELECT_REPORTS_SUCCESS,
		response,
		period
  }
}

function errorReports(error){
	return {
		type: constants.SELECT_REPORTS_FAILURE,
		error
  	}
}


export function loadReports(period){
	return dispatch => {
		dispatch(fetchReports());

		let path = config.url.createPath({server_name: 'Test', action_name: 'selectReports'});
		get(path, true)
		.then(resp => JSON.parse(resp))
		.then(resp => {
			if (resp.error){
				dispatch(errorReports(resp.error))
			}
			else {
				dispatch(receiveReports(resp, period))
			}
		})
		.catch(e => {
			dispatch(errorReports(e))
		})
	}
}
