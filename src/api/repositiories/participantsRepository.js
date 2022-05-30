import BaseRepository from './baseRepository.js'
import db from '../../models/index.js'
import { Op } from 'sequelize'

const TABLE = db.Participants
const ID_FIELD = 'id'

class UsersRepository extends BaseRepository {
  constructor() {
    super(TABLE, ID_FIELD)
  }

  async getByUserId(userId) {
    try {
      const participants = await this.TABLE.findAll({
        where: {
          userId: userId,
        },
      })

      return participants
    } catch (err) {
      throw err
    }
  }
}

export default UsersRepository
