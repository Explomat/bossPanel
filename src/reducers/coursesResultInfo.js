import constants from '../constants/constants';
import {setSuccess, setFailure} from './utils/setState';
import assign from 'lodash/assign';

function setCoursesPeriod(state, period){
	return assign(state, { period: period });
}

export default function coursesResultInfo(state = {
	coursesResultInfo: [],
	error: null,
	errorByPeriod: null,
	isFetching: false,
	isFetchingByPeriod: false,
	period: 'month'
}, action) {
	switch (action.type) {
		case constants.SELECT_COURSES_RESULT:
			return assign({}, state, { isFetching: true });
		case constants.SELECT_COURSES_RESULT_FAILURE:
			return setFailure(state, action.error, 'error', 'isFetching');
		case constants.SELECT_COURSES_RESULT_SUCCESS:
			return setCoursesPeriod(setSuccess(state, action.response, 'error', 'isFetching'), 'month');

		case constants.SELECT_COURSES_RESULT_BY_PERIOD:
			return assign({}, state, { isFetchingByPeriod: true });
		case constants.SELECT_COURSES_RESULT_BY_PERIOD_FAILURE:
			return setFailure(state, action.error, 'errorByPeriod', 'isFetchingByPeriod');
		case constants.SELECT_COURSES_RESULT_BY_PERIOD_SUCCESS:
			return setCoursesPeriod(setSuccess(state, action.response, 'errorByPeriod', 'isFetchingByPeriod'), action.period);

		default: 
			return state;
	}
}

