import {get, post} from '../utils/ajax';
import actionStatuses from '../utils/actionStatuses';
import camelcase from 'camelcase';
import config from '../config';
import {assign, omit} from 'lodash';

function requestFromAction(action){
	const meta = action.meta;
	const httpType = meta.httpType;
	const serverName = meta.serverName;
	const actionName = camelcase(action.type);

	if (httpType === 'POST'){
		return post(config.url.createPath({
			server_name: serverName,
			action_name: actionName
		}), JSON.stringify(action.payload));
	}
	else {
		let standParams = {server_name: serverName, action_name: actionName};
		let otherParams = omit(action, ['meta', 'type']);
		return get(config.url.createPath(assign(standParams, otherParams)));
	}
}

export default store => next => action => {
	if (action.meta && action.meta.remote) {
	    requestFromAction(action)
	    .then(data => {
	    	let newAction = {
	    		type: action.type + '_SUCCESS',
	    		response: JSON.parse(data)
	    	}
	    	return next(newAction);
	    }, e => {
	    	let newAction = {
	    		type: action.type + '_FAILURE',
	    		error: e.message
	    	}
	    	return next(newAction);
	    }).catch( e => {
	    	let newAction = {
	    		type: action.type + '_FAILURE',
	    		error: e.message
	    	}
	    	return next(newAction);
	    })
	}
	return next(action);
}