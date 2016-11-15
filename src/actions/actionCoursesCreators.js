import {get} from '../utils/ajax';
import config from '../config';
import constants from '../constants'

function fetchCourses() {
	return {
		type: constants.SELECT_COURSES_RESULT
  }
}

function receiveCourses(response, period) {
	return {
		type: constants.SELECT_COURSES_RESULT_SUCCESS,
		response,
		period
  }
}

function errorCourses(error){
	return {
		type: constants.SELECT_COURSES_RESULT_FAILURE,
		error
  }
}

function fetchCoursesByPeriod() {
	return {
		type: constants.SELECT_COURSES_RESULT_BY_PERIOD
  }
}

function receiveCoursesByPeriod(response, period) {
	return {
	    type: constants.SELECT_COURSES_RESULT_BY_PERIOD_SUCCESS,
	    response,
	    period
  }
}

function errorCoursesByPeriod(error) {
	return {
	    type: constants.SELECT_COURSES_RESULT_BY_PERIOD_FAILURE,
	    error
  }
}

export function loadCourses(period){
	return dispatch => {
		dispatch(fetchCourses());

		let path = config.url.createPath({server_name: 'Test', action_name: 'selectCoursesResult', period: period});
		get(path, true)
		.then(resp => JSON.parse(resp))
		.then(resp => {
			if (resp.error){
				dispatch(errorCourses(resp.error))
			}
			else {
				dispatch(receiveCourses(resp, period))
			}
		})
		.catch(e => {
			dispatch(errorCourses(e))
		})
	}
}

export function loadCoursesByPeriod(period){
	return dispatch => {
		dispatch(fetchCoursesByPeriod());

		let path = config.url.createPath({server_name: 'Test', action_name: 'selectCoursesResult', period: period});
		get(path, true)
		.then(resp => JSON.parse(resp))
		.then(resp => {
			if (resp.error){
				dispatch(errorCoursesByPeriod(resp.error))
			}
			else {
				dispatch(receiveCoursesByPeriod(resp, period))
			}
		})
		.catch(e => {
			dispatch(errorCoursesByPeriod(e))
		})
	}
}