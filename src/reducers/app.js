import constants from '../constants/constants';
import {setSuccess, setFailure} from './utils/setState';
import assign from 'lodash/assign';

export default function app(state = {
	access: false
}, action) {
	switch (action.type) {
		case constants.GET_ACCESS:
			return assign({}, state, { isFetching: true });
		case constants.GET_ACCESS_FAILURE:
			return setFailure(state, action.error, 'error', 'isFetching');
		case constants.GET_ACCESS_SUCCESS:
			return setSuccess(state, action.response, 'error', 'isFetching');

		default: 
			return state;
	}
}

