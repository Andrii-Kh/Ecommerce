import { CHANGE_CURRENCY } from '../reducers/currency'
import { LOG_UPDATE } from '../reducers/log'
import { BACKET_LIST, DELETE_PRODUCT, SET_SORT_DIRECTION } from '../reducers/products'
// eslint-disable-next-line
const LoggingMiddleware = (store) => {
  const { dispatch, getState } = store
  return (next) => {
    return (action) => {
      const formatedDate = () => {
        const ISOdate = new Date().toISOString()
        return `${ISOdate.slice(0, 10)} ${ISOdate.slice(11, 19)}`
      }
      const setLogs = (logStr) => {
        const uniqueId = +new Date()
        fetch('/api/v1/logs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id: uniqueId, string: logStr })
        })
          .then((r) => r.json())
          .then((list) => dispatch({ type: LOG_UPDATE, logList: list }))
          .catch((e) => console.log(e))
      }
      switch (action.type) {
        case CHANGE_CURRENCY:
          {
            const { currency } = getState().currency
            const newCurrency = action.currency
            const logString = `time of action in ${formatedDate()} change currency from ${currency} to ${newCurrency}`
            /* dispatch({
              type: LOG_UPDATE,
              logList: `time of action in ${formatedDate()} change currency from ${currency} to ${newCurrency}`
            }) */
            setLogs(logString)
          }
          break
        case BACKET_LIST:
          {
            const item = action.product
            const logString = `time of action in ${formatedDate()} add ${item.title} to the backet`
            /* dispatch({
              type: LOG_UPDATE,
              logList: `time of action in ${formatedDate()} add ${item.title} to the backet`
            }) */
            setLogs(logString)
          }
          break
        case DELETE_PRODUCT:
          {
            const item = action.product
            const logString = `time of action in ${formatedDate()} remove ${
              item.title
            } from the backet`
            /* dispatch({
              type: LOG_UPDATE,
              logList: `time of action in ${formatedDate()} remove ${item.title} from the backet`
            }) */
            setLogs(logString)
          }
          break
        case '@@router/LOCATION_CHANGE':
          {
            const url = action.payload.location.pathname
            const logString = `time of action in ${formatedDate()} navigate to ${url} page`
            /* dispatch({
              type: LOG_UPDATE,
              logList: `time of action in ${formatedDate()} navigate to ${url} page`
            }) */
            setLogs(logString)
          }
          break
        case SET_SORT_DIRECTION:
          {
            const { sortType } = action
            const { sort } = getState().products
            const logString = `time of action in ${formatedDate()} sort by ${sortType} - ${
              sort[sortType] ? 'a-z' : 'z-a'
            }`
            /* dispatch({
              type: LOG_UPDATE,
              logList: `time of action in ${formatedDate()} sort by ${sortType} - ${
                sort[sortType] ? 'a-z' : 'z-a'
              }`
            }) */
            setLogs(logString)
          }
          break
        default:
          return next(action)
      }
      return next(action)
    }
  }
}
export default LoggingMiddleware
