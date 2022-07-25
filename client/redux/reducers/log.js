export const LOG_UPDATE = 'LOG_UPDATE'

const initialState = {
  logList: []
}

export default (state = initialState, action = '') => {
  switch (action.type) {
    case LOG_UPDATE: {
      return {
        ...state,
        logList: action.logList
      }
    }
    default:
      return state
  }
}

export const getlogs = () => {
  return (dispatch) => {
    fetch('api/v1/logs')
      .then((r) => r.json())
      .then((list) => dispatch({ type: LOG_UPDATE, logList: list }))
      .catch((e) => console.log(e))
  }
}
