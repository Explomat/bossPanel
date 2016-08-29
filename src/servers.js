import {generate} from './utils/uuid';

let servers = [];

/*
	srv: {id: 1, name: 'test'}
*/
function Server(srv){

	const id  = srv.id || generate();
	const name = srv.name || 'name_' + srv.id;
	let actions = [];

	this.addActions = function(_actions){
		_actions = _actions || [];
		actions = actions.concat(_actions);
		return this;
	}

	this.getId = function(){
		return id;
	}

	this.getName = function(){
		return name;
	}

	this.getActions = function(){
		return actions;
	}
}

export function addServer(srv){
	if (typeof srv !== 'object'){
		throw TypeError('Argument must be an object like this \r\n "{id: 1, name: \'Test\'}"');
	}
	let server = new Server(srv);
	servers.push(server);
	return server;
}

export function getAll(){
	return servers;
}
