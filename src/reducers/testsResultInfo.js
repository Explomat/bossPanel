import constants from '../constants/constants';
import {setSuccess, setFailure} from './utils/setState';
import assign from 'lodash/assign';

function setTestsPeriod(state, period){
	return assign(state, { period: period });
}

export default function testsResultInfo(state = {
	testsResultInfo: [],
	error: null,
	errorByPeriod: null,
	isFetching: true,
	isFetchingByPeriod: false,
	period: 'month'
}, action) {
	switch (action.type) {
		case constants.SELECT_TESTS_RESULT:
			return assign({}, state, { isFetching: true });
		case constants.SELECT_TESTS_RESULT_FAILURE:
			return setFailure(state, action.error, 'error', 'isFetching');
		case constants.SELECT_TESTS_RESULT_SUCCESS:
			return setTestsPeriod(setSuccess(state, action.response, 'error', 'isFetching'), 'month');

		case constants.SELECT_TESTS_RESULT_BY_PERIOD:
			return assign({}, state, { isFetchingByPeriod: true });
		case constants.SELECT_TESTS_RESULT_BY_PERIOD_FAILURE:
			return setFailure(state, action.error, 'errorByPeriod', 'isFetchingByPeriod');
		case constants.SELECT_TESTS_RESULT_BY_PERIOD_SUCCESS:
			return setTestsPeriod(setSuccess(state, action.response, 'errorByPeriod', 'isFetchingByPeriod'), action.period);

		default: 
			return state;
	}
}

