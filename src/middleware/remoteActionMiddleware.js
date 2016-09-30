import {get, post} from '../utils/ajax';
import actionStatuses from '../utils/actionStatuses';
import camelcase from 'camelcase';
import config from '../config';
import {assign, omit} from 'lodash';

function requestFromAction(action, params, isCache){
	const httpType = action.meta.httpType;

	if (httpType === 'POST'){
		return post(config.url.createPath(params), JSON.stringify(action.payload), isCache);
	}
	else {
		return get(config.url.createPath(params), isCache);
	}
}

export default store => next => action => {
	if (action.meta && action.meta.remote) {
		let params = assign({server_name: action.meta.serverName, action_name: camelcase(action.type)}, omit(action, ['meta', 'type']));

	    requestFromAction(action, params, action.meta.cache)
	    .then(data => {
	    	let newAction = assign({
	    		type: action.type + '_SUCCESS',
	    		response: JSON.parse(data),
	    	}, params)
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