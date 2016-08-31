import constants from '../constants/constants';

export function getState() {
  return {
    meta: { remote: true, serverName: 'Test' },
    type: constants.GET_STATE
  }
}

export function selectTestsPeriod(payload) {
  return {
    meta: { remote: true, serverName: 'Test' },
    type: constants.SELECT_TESTS_PERIOD,
    period: payload
  }
}

export function selectCoursesPeriod(payload) {
  return {
    meta: { remote: true, serverName: 'Test' },
    type: constants.SELECT_COURSES_PERIOD,
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

