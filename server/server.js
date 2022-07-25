import express from 'express'
import path from 'path'
import cors from 'cors'
import sockjs from 'sockjs'

import cookieParser from 'cookie-parser'
import config from './config'
import { getCurrencyFunc, getProductsFunc, readFunc, sortProductList } from './common'
import Html from '../client/html'
import logs from '../client/components/logs'

require('colors')

let connections = []

const port = process.env.PORT || 8090
const server = express()

const middleware = [
  cors(),
  express.static(path.resolve(__dirname, '../dist/assets')),
  express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }),
  express.json({ limit: '50mb', extended: true }),
  cookieParser()
]

middleware.forEach((it) => server.use(it))

server.get('/api/v1/products', async (req, res) => {
  const productsFile = await getProductsFunc()
  res.json(productsFile)
})

server.get('/api/v1/price', async (req, res) => {
  const price = await getCurrencyFunc()
  res.json(price)
})

server.post('/api/v1/sort', async (req, res) => {
  const productsFile = await readFunc()
  const { sortType, direction } = req.body
  const sortList = sortProductList(productsFile, sortType, direction)
  res.json(sortList)
})

let logsArr = []

server.get('/api/v1/logs', async (req, res) => {
  res.json(logsArr)
})

server.post('/api/v1/logs', async (req, res) => {
  logsArr.push(req.body)
  res.json(logsArr)
})

server.use('/api/', (req, res) => {
  res.status(404)
  res.end()
})

server.get('/*', (req, res) => {
  const initialState = {
    location: req.url
  }

  return res.send(
    Html({
      body: '',
      initialState
    })
  )
})

const app = server.listen(port)

if (config.isSocketsEnabled) {
  const echo = sockjs.createServer()
  echo.on('connection', (conn) => {
    connections.push(conn)
    conn.on('data', async () => {})

    conn.on('close', () => {
      connections = connections.filter((c) => c.readyState !== 3)
    })
  })
  echo.installHandlers(app, { prefix: '/ws' })
}
console.log(`Serving at http://localhost:${port}`)
