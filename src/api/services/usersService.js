import UsersRepository from '../repositiories/usersRepository.js'

import Api404Error from '../../errors/api404Error.js'
import BadRequestError from '../../errors/badRequestError.js'

import bcrypt from 'bcryptjs'

class UsersService {
  constructor() {
    this.REPO = new UsersRepository()
  }

  async getAll(keyword) {
    try {
      const excludeAttrs = ['password']
      let users = []
      if (!keyword) {
        users = await this.REPO.getAll(excludeAttrs)
      } else {
        users = await this.REPO.searchUsersByKeyword(keyword)
      }

      return {
        success: true,
        data: users,
        message: 'Get all users.',
      }
    } catch (err) {
      throw err
    }
  }

  async getById(id) {
    try {
      const message = await this.REPO.getById(id)
      if (!message)
        throw new Api404Error(`The message with id: ${id} not found.`)

      return {
        success: true,
        data: message,
        message: 'Get message by id successfully.',
      }
    } catch (err) {
      throw err
    }
  }

  async create(message) {
    try {
      if (!user.fullName) {
        throw new BadRequestError('Please pass fullName param!')
      }

      if (!user.phoneNumber) {
        throw new BadRequestError('Please pass phoneNumber param!')
      }

      if (!user.password) {
        throw new BadRequestError('Please pass password param!')
      }

      user.password = await this.hashPassword(user.password, 10)
      let result = await this.REPO.create(user)

      result = result.dataValues

      if (result) {
        delete result['password']
      }

      return {
        success: true,
        data: result,
        message: 'The users is created successfully.',
      }
    } catch (err) {
      throw err
    }
  }

  async hashPassword(password, saltRound = 10) {
    try {
      const salt = await bcrypt.genSalt(saltRound)
      const hashedPassword = await bcrypt.hash(password, salt)
      return hashedPassword
    } catch (err) {
      throw err
    }
  }

  async updateById(id, user) {
    if (!id) throw new Api404Error(`The user with ${id}: not found.`)

    if (user.password) {
      user.password = hashPassword(user.password)
    }

    const updatedUser = await this.REPO.updateById(id, user)

    return {
      success: true,
      data: updatedUser,
      message: `This user is updated successfully.`,
    }
  }

  async deleteById(id) {
    try {
      if (!id) throw new Api404Error(`The user with id ${id}: not exist.`)
      const result = await this.REPO.deleteById(id)
      if (result === 0)
        throw new Api404Error(`The user with id ${id}: not exist.`)

      return {
        success: true,
        data: result,
        message: 'The user is deleted successfully.',
      }
    } catch (err) {
      throw err
    }
  }
}

export default UsersService
