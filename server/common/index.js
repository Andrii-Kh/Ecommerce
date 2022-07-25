import axios from 'axios'
import { readFile, writeFile } from 'fs/promises'

const urlOfProducts =
  'https://raw.githubusercontent.com/ovasylenko/skillcrcuial-ecommerce-test-data/master/data.json'

export const getData = async (url) => {
  const result = await axios(url)
    .then(({ data }) => data)
    .catch((er) => {
      console.log(er)
      return []
    })
  return result
}

export const readFunc = () => {
  return readFile(`${__dirname}/../data/data.json`, { encoding: 'utf8' }).then((text) =>
    JSON.parse(text)
  )
}

export const writeFunc = (productsArr) => {
  writeFile(`${__dirname}/../data/data.json`, JSON.stringify(productsArr), { encoding: 'utf8' })
}

export const getProductsFunc = () => {
  return readFunc().catch(async () => {
    const productsList = await getData(urlOfProducts)
    await writeFunc(productsList)
    return productsList
  })
}

function rateChecker() {
  let ratesRequestDate = 0
  const msAtHour = 1000 * 60 * 60 // 1 Hour
  let currency = {}
  return {
    checkDate: (dateMs = 0) => ratesRequestDate + msAtHour <= dateMs,
    setRateDate: (dateMs = 0) => {
      ratesRequestDate = dateMs
    },
    setCurrency: (newCurrency = {}) => {
      currency = { ...newCurrency }
    },
    getRates: () => currency
  }
}

const myRates = rateChecker()

export const getCurrencyFunc = async () => {
  const urlOfPrice = 'https://api.exchangerate.host/latest?base=USD&symbols=USD,EUR,CAD'
  const mockRates = {
    CAD: 1.3,
    EUR: 0.9,
    USD: 1
  }

  const date = +new Date()

  if (myRates.checkDate(date)) {
    console.log('Wait data from exchange API...')
    await axios(urlOfPrice)
      .then(({ data }) => data.rates)
      .then((cur) => myRates.setCurrency(cur))
      .catch(() => mockRates)
    myRates.setRateDate(date)
  }
  return myRates.getRates()
}

export const sortProductList = (list, sortType, direction) => {
  switch (sortType) {
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
