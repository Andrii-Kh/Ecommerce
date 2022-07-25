import axios from 'axios'

const GET_PRODUCTSLIST = 'GET_PRODUCTSLIST'
export const SET_SORT_DIRECTION = 'SET_SORT_DIRECTION'
export const BACKET_LIST = 'BACKET_LIST'
export const DELETE_PRODUCT = 'DELETE_PRODUCT'
const DELETE_PRICE = 'DELETE_PRICE'
const CHANGE_PRICE = 'CHANGE_PRICE'

const initialState = {
  list: [],
  backet: [],
  sort: {
    name: true,
    price: true
  },
  sortType: 'name'
}

export default (state = initialState, action = '') => {
  switch (action.type) {
    case GET_PRODUCTSLIST: {
      return {
        ...state,
        list: action.list
      }
    }
    case SET_SORT_DIRECTION: {
      return {
        ...state,
        sort: action.sort,
        sortType: action.sortType
      }
    }
    case BACKET_LIST: {
      return {
        ...state,
        backet: action.backet
      }
    }
    case DELETE_PRODUCT: {
      return {
        ...state,
        backet: action.backet
      }
    }
    case CHANGE_PRICE: {
      return {
        ...state,
        list: action.list
      }
    }
    default:
      return state
  }
}

export function getProductsList() {
  return (dispatch) => {
    axios('/api/v1/products').then(({ data }) => {
      dispatch({ type: GET_PRODUCTSLIST, list: data })
    })
  }
}

export function sortProductsList(sortType, direction) {
  return (dispatch, getState) => {
    const { pathname } = getState().router.location
    if (pathname === '/') {
      axios('/api/v1/sort', {
        method: 'POST',
        'Content-Type': 'application/json',
        data: {
          sortType,
          direction
        }
      }).then(({ data }) => {
        dispatch({ type: GET_PRODUCTSLIST, list: data })
      })
    }
  }
}

export function setSortToggle(sortType) {
  return (dispatch, getState) => {
    const { sort } = getState().products
    dispatch({ type: SET_SORT_DIRECTION, sort: { ...sort, [sortType]: !sort[sortType] }, sortType })
  }
}

export function addProductsInBacket(id) {
  return (dispatch, getState) => {
    const backetList = getState().products.backet
    const { list } = getState().products
    const foundProdOfList = list.find((prod) => prod.id === id)
    const foundProdOfBacket = backetList.find((prod) => prod.id === id)
    const backet =
      typeof foundProdOfBacket === 'undefined'
        ? [...backetList, { ...foundProdOfList, amount: 1 }]
        : backetList.reduce((acc, rec) => {
            if (rec?.id === id) {
              acc.push({ ...rec, amount: rec.amount + 1 })
            } else {
              acc.push(rec)
            }
            return acc
          }, [])
    dispatch({ type: BACKET_LIST, backet, product: foundProdOfList })
  }
}

export function deleteProductInBacket(id) {
  return (dispatch, getState) => {
    const backetList = getState().products.backet
    const foundProdOfList = backetList.find((prod) => prod.id === id)
    const backet = backetList.reduce((acc, rec) => {
      if (rec?.id === id) {
        if (rec.amount > 1) {
          acc.push({ ...rec, amount: rec.amount - 1 })
        } else {
          return acc
        }
      } else {
        acc.push(rec)
      }
      return acc
    }, [])

    dispatch({ type: DELETE_PRODUCT, backet, product: foundProdOfList })
  }
}

export function deleteProductPrice(price) {
  return (dispatch, getState) => {
    const productPriceList = getState().products.price
    const productPriceListNew = productPriceList.filter((it) => it !== price)
    dispatch({ type: DELETE_PRICE, price: productPriceListNew })
  }
}

export function changePriceOfList(currency) {
  return (dispatch, getState) => {
    const { list } = getState().products
    const { rates } = getState().currency
    const listWithUpdatePrice = list.forEach((prod) => prod.price * rates[currency])
    dispatch({ type: CHANGE_PRICE, list: listWithUpdatePrice })
  }
}
