import BaseError from './baseError.js'

export const logError = (err) => {
  console.log(err)
}

export const logErrorMiddleware = (err, req, res, next) => {
  logError(err)
  next(err)
}

export const returnError = (err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).json({
      success: false,
      data: null,
      message: err.message,
    })
  } else {
    res.status(500).json({
      success: false,
      data: null,
      message: 'Something went wrong.',
    })
  }
}

export const isOperationalError = (err) => {
  if (err instanceof BaseError) {
    return error.isOperational
  }
  return false
}
