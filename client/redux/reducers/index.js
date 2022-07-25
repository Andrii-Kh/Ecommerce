import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import auth from './auth'
import products from './products'
import currency from './currency'
import log from './log'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth,
    products,
    currency,
    log
  })

export default createRootReducer
