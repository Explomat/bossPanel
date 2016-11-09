import constants from '../constants/constants';

export function getAccess(){
  return {
    meta: { remote: true, serverName: 'Test' },
    type: 'GET_ACCESS'
  }
}

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

export function searchAdaptData(value){
  return {
    type: constants.SEARCH_ADAPT_DATA,
    value
  }
}

export function changeAdaptStatus(status, searchValue){
  return {
    type: constants.CHANGE_ADAPT_STATUS,
    status,
    searchValue
  }
}

export function sortAdaptData(payload){
  return {
    type: constants.SORT_ADAPT_DATA,
    payload
  }
}

export function selectRequestsResult(){
  return {
    meta: { remote: true, cache: true, serverName: 'Test' },
    type: constants.SELECT_REQUESTS_RESULT
  }
}

export function searchRequestsData(value){
  return {
    type: constants.SEARCH_ADAPT_DATA,
    value
  }
}

export function sortRequestsData(payload){
  return {
    type: constants.SORT_ADAPT_DATA,
    payload
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
