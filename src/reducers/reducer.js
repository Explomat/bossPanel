import constants from '../constants/constants';
import {Map} from 'immutable';

function getStateFailure(state, error){
	return state.set('error', error).set('fetching', false);
}

function getStateSuccess(state, newState){
	return state.merge(newState).set('fetching', false);
}

export default function(state = Map(), action) {
	switch (action.type) {
		case constants.GET_STATE:
			return state.set('fetching', true);
		case constants.GET_STATE_FAILURE:
			return getStateFailure(state, action.error);
		case constants.GET_STATE_SUCCESS:
			return getStateSuccess(state, action.response);
	}
	return state;
}