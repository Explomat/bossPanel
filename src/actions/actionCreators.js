import constants from '../constants/constants';

export function selectTab(tab){
  return {
    type: constants.SELECT_TAB,
    tab
  }
}

export function selectTestsResult() {
  return {
    meta: { remote: true, cache: true, serverName: 'Test' },
    type: constants.SELECT_TESTS_RESULT
  }
}

export function selectCoursesResult() {
  return {
    meta: { remote: true, cache: true, serverName: 'Test' },
    type: constants.SELECT_COURSES_RESULT
  }
}

export function selectTestsResultByPeriod(period) {
  return {
    meta: { remote: true, cache: true, serverName: 'Test' },
    type: constants.SELECT_TESTS_RESULT_BY_PERIOD,
    period
  }
}

export function selectCoursesResultByPeriod(period) {
  return {
    meta: { remote: true, cache: true, serverName: 'Test' },
    type: constants.SELECT_COURSES_RESULT_BY_PERIOD,
    period
  }
}

export function selectAdaptResult(){
  return {
    meta: { remote: true, cache: true, serverName: 'Test' },
    type: constants.SELECT_ADAPT_RESULT
  }
}

export function selectRequestsResult(){
  return {
    meta: { remote: true, cache: true, serverName: 'Test' },
    type: constants.SELECT_REQUESTS_RESULT
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
