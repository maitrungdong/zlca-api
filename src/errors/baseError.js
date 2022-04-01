class BaseError extends Error {
  constructor(name, statusCode, isOperational, message) {
    super(message)

    Object.setPrototypeOf(this, new.target.prototype)
    this.name = name
    this.statusCode = statusCode
    this.isOperational = isOperational
    Error.captureStackTrace(this)
  }
}

export default BaseError
