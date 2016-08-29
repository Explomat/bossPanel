import {get, post} from '../utils/ajax';
import camelcase from 'camelcase';
import config from '../config';

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
		return get(config.url.createPath({server_name: serverName, action_name: actionName}));
	}
}

export default store => next => action => {
	if (action.meta && action.meta.remote) {
	    requestFromAction(action).then(data => {
	    	action.status = 'success';
	    	action.response = JSON.parse(data);
	    	action.meta.remote = false;
	    	store.dispatch(action);
	    }).catch(e => {
	    	action.status = 'error';
	    	action.error = e.message;
	    	action.meta.remote = false;
	    	store.dispatch(action);
	    });
	}
	action.status = 'fetching';
	return next(action);
}