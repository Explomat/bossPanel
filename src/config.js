import {addServer, getAll} from  './servers';
import env from './env';

const routerId = '6238833803725312131';
const customBaseUrl = env === 'production' ? '/custom_web_template.html' : 'https://study.merlion.ru/custom_web_template.html';

addServer({id: '6322023433485303550', name: 'Test'})
.addActions(
	[
		'getState',
		'selectTestsResultByPeriod',
		'selectCoursesResultByPeriod',
		'selectTestsResult',
		'selectCoursesResult',
		'selectAdaptResult',
		'selectRequestsResult'
	]
);

var obj = {

	url: {
		getServerId(_server_name, _action_name) {
			var _servers = getAll().filter(s => {
				var actions = s.getActions().filter(action => {
					return action === _action_name;
				});
				return (s.getName() === _server_name && actions.length > 0);
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
	}
}

export default obj;