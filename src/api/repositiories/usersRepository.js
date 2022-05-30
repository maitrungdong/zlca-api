import BaseRepository from './baseRepository.js'
import db from '../../models/index.js'
import { Op } from 'sequelize'

const TABLE = db.User
const ID_FIELD = 'id'

class UsersRepository extends BaseRepository {
  constructor() {
    super(TABLE, ID_FIELD)
  }

  async getUserByPhoneNumber(phoneNumber, excludes = ['password']) {
    try {
      const user = await this.TABLE.findOne({
        where: {
          phoneNumber: phoneNumber,
        },
        attributes: { exclude: excludes },
      })

      return user
    } catch (err) {
      throw err
    }
  }

  async searchUsersByKeyword(keyword, excludes = ['password']) {
    try {
      const users = await this.TABLE.findAll({
        where: {
          [Op.or]: [
            {
              fullName: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              phoneNumber: {
                [Op.like]: `%${keyword}%`,
              },
            },
          ],
        },
        attributes: {
          exclude: excludes,
        },
      })

      return users
    } catch (err) {
      throw err
    }
  }
}

export default UsersRepository
