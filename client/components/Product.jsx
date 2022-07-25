import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addProductsInBacket } from '../redux/reducers/products'

const Product = (props) => {
  const { currency } = useSelector((s) => s.currency)
  const { rates } = useSelector((s) => s.currency)
  const backetList = useSelector((s) => s.products.backet)
  const dispatch = useDispatch()
  const addProduct = (id) => {
    dispatch(addProductsInBacket(id))
  }

  return (
    <div
      className="flex flex-col justify-center items-center card border-2 border-black m-4 w-52 h-52 bg-slate-100"
      title={props.description}
    >
      <img alt={props.title} src={props.image} className="w-20 h-20 card__image" />
      <div className="card__price">
        price: {(props.price * rates[currency]).toFixed(2)} {currency}
      </div>
      <div className="card__title ">{props.title}</div>
      <div>
        {backetList.find((prod) => prod.id === props.id) ? (
          <div>Amount products: {backetList.find((prod) => prod.id === props.id).amount}</div>
        ) : null}
      </div>
      <button
        type="button"
        className=" border-2 border-black w-12 rounded-full"
        onClick={() => {
          addProduct(props.id)
        }}
      >
        add
      </button>
    </div>
  )
}

export default Product
