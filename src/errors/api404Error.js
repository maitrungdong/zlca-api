import { httpStatusCode } from '../utils/constants.js'
import BaseError from './baseError.js'

class Api404Error extends BaseError {
  constructor(
    message = 'Not found.',
    name = 'Api404Error',
    statusCode = httpStatusCode.NOT_FOUND,
    isOperational = true
  ) {
    super(name, statusCode, isOperational, message)
  }
}

export default Api404Error
