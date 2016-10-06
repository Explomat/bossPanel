import constants from '../constants/constants';

export function getState() {
  return {
    meta: { remote: true, serverName: 'Test' },
    type: constants.GET_STATE
  }
}

export function selectTab(tab){
  return {
    type: constants.SELECT_TAB,
    tab
  }
}

export function selectTestsResultByPeriod(payload) {
  return {
    meta: { remote: true, cache: true, serverName: 'Test' },
    type: constants.SELECT_TESTS_RESULT_BY_PERIOD,
    period: payload
  }
}

export function selectCoursesResultByPeriod(payload) {
  return {
    meta: { remote: true, cache: true, serverName: 'Test' },
    type: constants.SELECT_COURSES_RESULT_BY_PERIOD,
    period: payload
  }
}

export function selectEventsPeriod(payload) {
  return {
    meta: { remote: true, serverName: 'Test' },
    type: constants.SELECT_EVENTS_PERIOD,
    period: payload
  }
}

export function selectAdaptationPeriod(payload) {
  return {
    meta: { remote: true, serverName: 'Test' },
    type: constants.SELECT_ADAPTATION_PERIOD,
    period: payload
  }
}

export function selectLibraryMaterialsPeriod(payload) {
  return {
    meta: { remote: true, serverName: 'Test' },
    type: constants.SELECT_LIBRARY_MATERIALS_PERIOD,
    period: payload
  }
}

