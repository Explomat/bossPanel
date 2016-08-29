import {get, post} from '../utils/ajax';

function getAjaxUrlFromAction(action){
	
}

export default store => next => action => {
	if (action.meta && action.meta.remote) {
	    socket.emit('action', action);
	}
	return next(action);
}