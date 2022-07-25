import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { changeCurrency, getCurrencyRates } from '../redux/reducers/currency'
import { setSortToggle, sortProductsList } from '../redux/reducers/products'

const Head = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCurrencyRates())
  }, [])

  const onClick = (currency) => {
    dispatch(changeCurrency(currency))
  }
  const { sort } = useSelector((s) => s.products)

  const sortProducts = (sortType) => {
    dispatch(setSortToggle(sortType))
    dispatch(sortProductsList(sortType, sort[sortType]))
  }
  const backetList = useSelector((s) => s.products.backet)

  return (
    <div className="flex p-6 justify-around bg-slate-200">
      <Link to="/" id="brand-name" className="text-xl font-bold">
        Brand name
      </Link>
      <div className="flex">
        <Link to="/backet">Basket </Link>
        <span className="ml-3 w-8 text-center border rounded-full bg-red-300" id="order-count">
          {backetList.reduce((acc, rec) => {
            return acc + rec.amount
          }, 0)}
        </span>
      </div>

      <div className="flex">
        <div>
          <button
            type="button"
            className="border w-12 bg-amber-300 rounded-full focus:bg-green-300 "
            onClick={() => {
              onClick('USD')
            }}
          >
            USD
          </button>
          <button
            type="button"
            className="border w-12  bg-amber-300 rounded-full focus:bg-green-300 ml-2"
            onClick={() => onClick('EUR')}
          >
            EUR
          </button>
          <button
            type="button"
            className="border w-12  bg-amber-300 rounded-full focus:bg-green-300 ml-2"
            onClick={() => onClick('CAD')}
          >
            CAD
          </button>
        </div>
      </div>
      <div>
        <button
          type="button"
          className="border w-24  bg-amber-300 rounded-full focus:bg-green-300"
          onClick={() => sortProducts('price')}
        >
          sort price <span>{sort.price ? '▲' : '▼'}</span>
        </button>
        <button
          type="button"
          className="border w-24  bg-amber-300 rounded-full focus:bg-green-300 ml-2"
          onClick={() => sortProducts('name')}
        >
          sort name <span>{sort.name ? '▲' : '▼'}</span>
        </button>
      </div>
    </div>
  )
}

export default Head
