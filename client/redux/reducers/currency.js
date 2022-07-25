import axios from 'axios'

export const CHANGE_CURRENCY = 'CHANGE_CURRENCY'
const GET_CURRENCYRATES = 'GET_CURRENCYRATES'
const CHECK_RATE_DATE = 'CHECK_RATE_DATE'

const initialState = {
  currency: 'USD',
  rates: {},
  rateDate: 0
}

export default (state = initialState, action = '') => {
  switch (action.type) {
    case CHANGE_CURRENCY: {
      return {
        ...state,
        currency: action.currency
      }
    }
    case GET_CURRENCYRATES: {
      return {
        ...state,
        rates: action.rates
      }
    }
    case CHECK_RATE_DATE: {
      return {
        ...state,
        rateDate: action.rateDate
      }
    }
    default:
      return state
  }
}

export function changeCurrency(value) {
  return (dispatch, getState) => {
    const { currency } = getState().currency
    if (value !== currency) {
      dispatch({ type: CHANGE_CURRENCY, currency: value })
    }
  }
}

export function getCurrencyRates() {
  return (dispatch, getState) => {
    const { rateDate } = getState().currency
    const date = +new Date()
    if (rateDate + 1000 * 60 * 15 <= date) {
      axios('/api/v1/price').then(({ data }) => {
        dispatch({ type: GET_CURRENCYRATES, rates: data })
      })
      dispatch({ type: CHECK_RATE_DATE, rateDate: date })
    }
  }
}
