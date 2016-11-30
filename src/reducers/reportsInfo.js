import constants from '../constants/constants';
import {setSuccess, setFailure} from './utils/setState';
import assign from 'lodash/assign';

export default function reportsInfo(state = {
	reportsInfo: {types: {}, data: []},
	error: null,
	isFetching: true
}, action) {
	switch (action.type) {
		case constants.SELECT_REPORTS:
			return assign({}, state, { isFetching: true });
		case constants.SELECT_REPORTS_FAILURE:
			return setFailure(state, action.error, 'error', 'isFetching');
		case constants.SELECT_REPORTS_SUCCESS:
			return setSuccess(state, action.response, 'error', 'isFetching');

		default: 
			return state;
	}
}

