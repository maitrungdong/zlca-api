import BaseRepository from './baseRepository.js'
import db from '../../config/mySqlDB.js'

const TABLE = db.Image
const ID_FIELD = 'id'

class ImagesRepository extends BaseRepository {
  constructor() {
    super(TABLE, ID_FIELD)
  }
}

export default ImagesRepository
