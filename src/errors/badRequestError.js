import BaseError from './baseError.js'
import { httpStatusCode } from '../utils/constants.js'

class BadRequestError extends BaseError {
  constructor(
    message = 'Bad request.',
    name = 'BadRequestError',
    statusCode = httpStatusCode.BAD_REQUEST,
    isOperational = true
  ) {
    super(name, statusCode, isOperational, message)
  }
}

export default BadRequestError
