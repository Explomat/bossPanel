import constants from '../constants/constants';

export function getState() {
  return {
    meta: { remote: true, serverName: 'Test' },
    type: constants.GET_STATE
  }
}
