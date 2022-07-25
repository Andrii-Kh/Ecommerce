import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsList } from '../redux/reducers/products'
import Head from './Head'
import LogsButton from './LogsButton'
import Product from './Product'

const Main = () => {
  const dispatch = useDispatch()
  const { list } = useSelector((s) => s.products)
  console.log(list)

  useEffect(() => {
    if (list.length === 0) {
      dispatch(getProductsList())
    }
  }, [])

  return (
    <div>
      <Head />
      <div className="flex flex-wrap justify-center">
        {list.map((prod) => {
          return (
            <div key={prod?.id}>
              <Product
                image={prod.image}
                title={prod.title}
                price={prod.price}
                id={prod.id}
                description={prod.description}
              />
            </div>
          )
        })}
      </div>
      <LogsButton />
    </div>
  )
}

export default React.memo(Main)
