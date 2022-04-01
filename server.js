import express from 'express'

import morgan from 'morgan'
import dotenv from 'dotenv'
import cors from 'cors'

import { logError, isOperationalError } from './src/errors/errorHandler.js'
import routes from './routes.js'

dotenv.config()

const app = express()
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

//Routes
app.use('/', routes)

process.on('uncaughtException', (error) => {
  logError(error)

  if (!isOperationalError(error)) {
    process.exit(1)
  }
})

// if the Promise is rejected this will catch it
process.on('unhandledRejection', (error) => {
  throw error
})

process.on('uncaughtException', (error) => {
  logError(error)

  if (!isOperationalError(error)) {
    process.exit(1)
  }
})

//Server listen
let PORT = process.env.PORT || 8080
app.listen(PORT, function () {
  console.log(`Chat Application API is listening at http://localhost:${PORT}`)
})
