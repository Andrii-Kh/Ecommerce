import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProductInBacket } from '../redux/reducers/products'
import Head from './Head'
import LogsButton from './LogsButton'

const Backet = () => {
  const backetList = useSelector((s) => s.products.backet)
  const { currency } = useSelector((s) => s.currency)
  const { rates } = useSelector((s) => s.currency)
  const { sort } = useSelector((s) => s.products)
  const { sortType } = useSelector((s) => s.products)
  const { pathname } = useSelector((s) => s.router.location)
  const dispatch = useDispatch()

  const deleteProduct = (id) => {
    dispatch(deleteProductInBacket(id))
  }

  const sortProductList = (list, type, direction) => {
    if (pathname !== '/') {
      switch (type) {
        case 'name': {
          return list.sort((a, b) => {
            if (direction) {
              return a.title.localeCompare(b.title)
            }
            return b.title.localeCompare(a.title)
          })
        }
        case 'price': {
          return list.sort((a, b) => {
            if (direction) {
              return a.price - b.price
            }
            return b.price - a.price
          })
        }
        default:
          return list
      }
    }
    return list
  }

  return (
    <div>
      <Head />
      <div className="flex flex-wrap">
        {sortProductList(backetList, sortType, sort[sortType]).map((backetObj) => {
          const price = (backetObj.price * rates[currency]).toFixed(2)
          return (
            <div
              key={backetObj.id}
              className="flex flex-col justify-center items-center card border-2 border-black m-4 w-52 h-52 bg-slate-100"
            >
              <img alt="im" src={backetObj.image} className="product__image w-20 h-20" />
              <div className="product__price">
                price: {price} {currency}
              </div>
              <div className="product__title">{backetObj.title}</div>
              <div>Amount products: {backetObj.amount}</div>
              <div className="product__total_price">
                Total price: {(price * backetObj.amount).toFixed(2)} {currency}
              </div>
              <button
                type="button"
                className="product__remove border w-20 bg-red-200 rounded-full"
                onClick={() => {
                  deleteProduct(backetObj.id)
                }}
              >
                delete
              </button>
            </div>
          )
        })}
      </div>
      <div className="product__amout ml-4">
        Total amount products:{' '}
        {backetList.reduce((acc, rec) => {
          return acc + rec.amount
        }, 0)}
      </div>
      <div className="ml-4" id="total-amount">
        Total price:{' '}
        {backetList
          .reduce((acc, rec) => {
            const price = rec.price * rates[currency] * rec.amount
            return acc + price
          }, 0)
          .toFixed(2)}
        {currency}
      </div>
      <LogsButton />
    </div>
  )
}

export default Backet
