import BaseRepository from './baseRepository.js'
import db from '../../models/index.js'

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
}

export default UsersRepository
