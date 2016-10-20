import keymirror from 'keyMirror';
import dropDownPayload from './dropDownPayload';

let keys = keymirror({
	all: null,
	active: null,
	failed: null,
	passed: null,
	plan: null
});

let values = {
	all: 'Все статусы',
	active: 'В работе',
	failed: 'Выполнен неуспешно',
	passed: 'Выполнен успешно',
	plan: 'Планируется'
}

let payload = dropDownPayload(keys, values);

export {keys, values, payload};
