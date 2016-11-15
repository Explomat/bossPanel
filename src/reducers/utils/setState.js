import assign from 'lodash/assign';

export function setFailure(state, error, errorKey, fetchingKey){
	let newState = assign({}, state, {[errorKey]: error});
	delete newState[fetchingKey];
	return newState;
}

export function setSuccess(state, newState, errorKey, fetchingKey){
	let _newState = assign({}, state, newState);
	delete _newState[errorKey];
	delete _newState[fetchingKey];
	return _newState;
}