import keyMirror from 'keyMirror';

const actionStatuses = keyMirror({
	fetching: null,
	success: null,
	error: null
});

export default actionStatuses;