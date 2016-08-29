import {addServer, addActions} from  './servers';
const routerId = '6238833803725312131';
const customBaseUrl = '/custom_web_template.html';

servers
	.addServer({id: '6230716351040721570', name: 'Test'})
	.addActions(
		[
			'getData'
		]
	);


export default {

	url: {
		getServerId(_server_name, _action_name) {
			var _servers = servers.getAll().filter(s => {
				var actions = s.getActions().filter(action => {
					return action === _action;
				});
				return (s.getName() === _server && actions.length > 0);
			}).map( s => s.getId());
			return _servers.length > 0 ? _servers[0] : '';
		},

		createPath(obj){
			if (!('server_name' in obj)) return '/';
			if (!('action_name' in obj)) obj.action_name = '';
			var serverId = this.getServerId(obj.server_name, obj.action_name);
			var basePath = customBaseUrl.concat('?object_id=').concat(routerId).concat('&server_id='.concat(serverId));

			return basePath.concat(Object.keys(obj).map(function(k){
				return '&'.concat(k).concat('=').concat(obj[k]);
			}).join(''));
		}
	},

	dom: {
		appId: 'app'
	},

	hashes: {
		calendar: 'calendar'
	},

	setRouterId(_routerId){
		routerId = _routerId;
	},

	setCustomBaseUrl(_customBaseUrl){
		customBaseUrl = _customBaseUrl;
	},

	setProductionMode() {
		process.env.NODE_ENV = 'production';
	}
}