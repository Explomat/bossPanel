import constants from '../constants/constants';
import {assign} from 'lodash';
import {Map} from 'immutable';

function getState(state){
	return assign(state, {fetching: true});
}

function getMockState(){
	return {"testsResultInfo":[{"value":"5","label":"Проигнорировано"},{"value":"0","label":"Положительно"},{"value":"0","label":"Отрицательно"}],"coursesResultInfo":[{"value":"0","label":"Проигнорировано"},{"value":"0","label":"Положительно"},{"value":"0","label":"Отрицательно"}],"requestsInfo":[{"code":"2507","personFullname":"Широканова Елена Александровна","objectName":"Вебинар 'Работа с клиентской базой'","id":"6267423721839949778","href":"РўСѓС‚ СЃСЃС‹Р»РєР°"},{"code":"00641","personFullname":"Симбирцева Анастасия Владимировна","objectName":"Клиентоориентированность","id":"6145269460872739070","href":"РўСѓС‚ СЃСЃС‹Р»РєР°"},{"code":"07698","personFullname":"Валиуллин Андрей Русланович","objectName":"Очное обучение Intel и Asus","id":"6192805855323579403","href":"РўСѓС‚ СЃСЃС‹Р»РєР°"},{"code":"1382","personFullname":"Терещук Денис Игоревич","objectName":"Работа в команде","id":"6258557805319229859","href":"РўСѓС‚ СЃСЃС‹Р»РєР°"}],"adaptResultInfo":[{"personFullname":"Дятлев Евгений Евгеньевич","planReadinessDate":"18.11.2016","totalPercentComplete":"97","successPercentComplete":"94","id":"6320140794294705019","status":"active"},{"personFullname":"Олейник Роман Викторович","planReadinessDate":"19.10.2016","totalPercentComplete":"100","successPercentComplete":"91","id":"6321900099330057963","status":"active"},{"personFullname":"Пенковская Татьяна Степановна","planReadinessDate":"31.10.2016","totalPercentComplete":"97","successPercentComplete":"91","id":"6333122448830171052","status":"active"},{"personFullname":"Малев Сергей Владимирович","planReadinessDate":"01.11.2016","totalPercentComplete":"97","successPercentComplete":"94","id":"6325276415866011449","status":"active"},{"personFullname":"Дегтярев Андрей Сергеевич","planReadinessDate":"21.11.2016","totalPercentComplete":"97","successPercentComplete":"88","id":"6333006123857107572","status":"active"}],"eventResultInfo":[{"base":{"personFullname":"Дятлев Евгений Евгеньевич","plan_readiness_date":"18.11.2016","all_percent_complete":"97%","good_percent_complete":"94%"},"additionally":{"id":"6320140794294705019","status":"active"}},{"base":{"personFullname":"Олейник Роман Викторович","plan_readiness_date":"19.10.2016","all_percent_complete":"100%","good_percent_complete":"91%"},"additionally":{"id":"6321900099330057963","status":"active"}},{"base":{"personFullname":"Пенковская Татьяна Степановна","plan_readiness_date":"31.10.2016","all_percent_complete":"97%","good_percent_complete":"91%"},"additionally":{"id":"6333122448830171052","status":"active"}},{"base":{"personFullname":"Малев Сергей Владимирович","plan_readiness_date":"01.11.2016","all_percent_complete":"97%","good_percent_complete":"94%"},"additionally":{"id":"6325276415866011449","status":"active"}},{"base":{"personFullname":"Дегтярев Андрей Сергеевич","plan_readiness_date":"21.11.2016","all_percent_complete":"97%","good_percent_complete":"88%"},"additionally":{"id":"6333006123857107572","status":"active"}}]};
}

function setFailure(state, error, errorKey, fetchingKey){
	let newState = assign({}, state, {[errorKey]: error});
	delete newState[fetchingKey];
	return newState;
	//return state.set(errorKey, error).remove(fetchingKey);
}

function setSuccess(state, newState, errorKey, fetchingKey){
	let _newState = assign({}, state, newState);
	delete _newState[errorKey];
	delete _newState[fetchingKey];
	return _newState;
	//return state.merge(newState).remove(errorKey).remove(fetchingKey);
}

function setDefaultPeriods(state){
	return assign(state, {selectedTestsPeriod: 'month', selectedCoursesPeriod: 'month'});
}

function setTestsPeriod(state, period){
	return assign(state, { selectedTestsPeriod: period });
}

function setCoursesPeriod(state, period){
	return assign(state, { selectedCoursesPeriod: period });
}

export default function(state = {}, action) {
	switch (action.type) {
		case constants.GET_STATE:
			return getState(state);
		case constants.GET_STATE_FAILURE:
			return setFailure(state, action.error, 'error', 'fetching');
		case constants.GET_STATE_SUCCESS:
			return setDefaultPeriods(setSuccess(state, action.response, 'error', 'fetching'));

		case constants.SELECT_TESTS_RESULT_BY_PERIOD:
			return assign({}, state, {testsFetching: true});
		case constants.SELECT_TESTS_RESULT_BY_PERIOD_FAILURE:
			return setFailure(state, action.error, 'testsError', 'testsFetching');
		case constants.SELECT_TESTS_RESULT_BY_PERIOD_SUCCESS:
			return setTestsPeriod(setSuccess(state, action.response, 'testsError', 'testsFetching'), action.period);

		case constants.SELECT_COURSES_RESULT_BY_PERIOD:
			return assign({}, state, {coursesFetching: true});
		case constants.SELECT_COURSES_RESULT_BY_PERIOD_FAILURE:
			return setFailure(state, action.error, 'coursesError', 'coursesFetching');
		case constants.SELECT_COURSES_RESULT_BY_PERIOD_SUCCESS:
			return setCoursesPeriod(setSuccess(state, action.response, 'coursesError', 'coursesFetching'), action.period);

		case constants.SELECT_EVENTS_PERIOD:
			return assign({}, state, {eventsFetching: true});
		case constants.SELECT_EVENTS_PERIOD_FAILURE:
			return setFailure(state, action.error, 'eventsError', 'eventsFetching');
		case constants.SELECT_EVENTS_PERIOD_SUCCESS:
			return setSuccess(state, action.response, 'eventsError', 'eventsFetching');

		case constants.SELECT_ADAPTATION_PERIOD:
			return assign({}, state, {adaptationFetching: true});
		case constants.SELECT_ADAPTATION_PERIOD_FAILURE:
			return setFailure(state, action.error, 'adaptationError', 'adaptationFetching');
		case constants.SELECT_ADAPTATION_PERIOD_SUCCESS:
			return setSuccess(state, action.response, 'adaptationError', 'adaptationFetching');

		case constants.SELECT_LIBRARY_MATERIALS_PERIOD:
			return assign({}, state, {libraryMaterialsFetching: true});
		case constants.SELECT_LIBRARY_MATERIALS_PERIOD_FAILURE:
			return setFailure(state, action.error, 'libraryMaterialsError', 'libraryMaterialsFetching');
		case constants.SELECT_LIBRARY_MATERIALS_PERIOD_SUCCESS:
			return setSuccess(state, action.response, 'libraryMaterialsError', 'libraryMaterialsFetching');
		default:
			return state;
	}
}