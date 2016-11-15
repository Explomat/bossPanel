import {get} from '../utils/ajax';
import config from '../config';
import constants from '../constants'

function fetchTests() {
	return {
		type: constants.SELECT_TESTS_RESULT
  	}
}

function receiveTests(response, period) {
	return {
		type: constants.SELECT_TESTS_RESULT_SUCCESS,
		response,
		period
  }
}

function errorTests(error){
	return {
		type: constants.SELECT_TESTS_RESULT_FAILURE,
		error
  	}
}

function fetchTestsByPeriod() {
	return {
		type: constants.SELECT_TESTS_RESULT_BY_PERIOD
  	}
}

function receiveTestsByPeriod(response, period) {
	return {
	    type: constants.SELECT_TESTS_RESULT_BY_PERIOD_SUCCESS,
	    response,
	    period
  	}
}

function errorTestsByPeriod(error) {
	return {
	    type: constants.SELECT_TESTS_RESULT_BY_PERIOD_FAILURE,
	    error
  	}
}

export function loadTests(period){
	return dispatch => {
		dispatch(fetchTests());

		let path = config.url.createPath({server_name: 'Test', action_name: 'selectTestsResult', period: period});
		get(path, true)
		.then(resp => JSON.parse(resp))
		.then(resp => {
			if (resp.error){
				dispatch(errorTests(resp.error))
			}
			else {
				dispatch(receiveTests(resp, period))
			}
		})
		.catch(e => {
			dispatch(errorTests(e))
		})
	}
}

export function loadTestsByPeriod(period){
	return dispatch => {
		dispatch(fetchTestsByPeriod());

		let path = config.url.createPath({server_name: 'Test', action_name: 'selectTestsResult', period: period});
		get(path, true)
		.then(resp => JSON.parse(resp))
		.then(resp => {
			if (resp.error){
				dispatch(errorTestsByPeriod(resp.error))
			}
			else {
				dispatch(receiveTestsByPeriod(resp, period))
			}
		})
		.catch(e => {
			dispatch(errorTestsByPeriod(e))
		})
	}
}