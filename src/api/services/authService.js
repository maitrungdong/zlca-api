import UsersRepository from '../repositiories/usersRepository.js'

import BadRequestError from '../../errors/badRequestError.js'
import Api404Error from '../../errors/api404Error.js'

import bcrypt from 'bcryptjs'

class AuthService {
  constructor() {
    this.USER_REPO = new UsersRepository()
  }

  async signIn(userInfo) {
    try {
      if (!userInfo.phoneNumber) {
        throw new BadRequestError('Please pass phoneNumber param!')
      }

      if (!userInfo.password) {
        throw new BadRequestError('Please pass password param!')
      }

      let user = await this.USER_REPO.getUserByPhoneNumber(
        userInfo.phoneNumber,
        []
      )

      if (!user) {
        throw new Api404Error(
          `The user with phoneNumber: ${userInfo.phoneNumber} not found!`
        )
      }
      user = user.dataValues

      const isMatched = await this.checkPassword(
        userInfo.password,
        user.password
      )
      if (!isMatched) {
        throw new BadRequestError(`The password of user is not correct!`)
      }

      //Edit isOnline -> true
      await this.USER_REPO.updateById(user.id, { isOnline: true })

      delete user['password']
      user.isOnline = true

      return {
        success: true,
        data: user,
        message: 'The users is signed in successfully.',
      }
    } catch (err) {
      throw err
    }
  }

  async checkPassword(password, hashedPassword) {
    console.log({ password, hashedPassword })
    try {
      return await bcrypt.compare(password, hashedPassword)
    } catch (err) {
      throw err
    }
  }

  async signOut(userId) {
    try {
      await this.USER_REPO.updateById(userId, {
        isOnline: false,
        lastOnline: Date.now(),
      })

      return {
        success: true,
        data: null,
        message: 'The users signed out successfully.',
      }
    } catch (err) {
      throw err
    }
  }
}

export default AuthService
