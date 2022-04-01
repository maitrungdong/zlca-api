import BaseRepository from './baseRepository.js'
import db from '../../config/mySqlDB.js'

const TABLE = db.AllCode
const ID_FIELD = 'id'

class AllCodesRepository extends BaseRepository {
  constructor() {
    super(TABLE, ID_FIELD)
  }
}

export default AllCodesRepository
