class BaseRepository {
  constructor(table, idField) {
    this.TABLE = table
    this.ID_FIELD = idField
  }
  async getAll(excludes = []) {
    try {
      const list = await this.TABLE.findAll({
        attributes: { exclude: excludes },
      })
      return list
    } catch (err) {
      throw err
    }
  }
  async getById(id, excludes) {
    try {
      const entity = await this.TABLE.findOne({
        where: {
          id: id,
        },
        attributes: { exclude: excludes },
      })

      return entity
    } catch (err) {
      throw err
    }
  }
  async create(entity) {
    try {
      const createdEntity = await this.TABLE.create(entity)
      return createdEntity
    } catch (err) {
      throw err
    }
  }
  async deleteById(id) {
    try {
      return await this.TABLE.destroy({
        where: {
          id: id,
        },
      })
    } catch (err) {
      throw err
    }
  }
  async updateById(id, newEntity) {
    try {
      return await this.TABLE.update(newEntity, {
        where: {
          id: id,
        },
      })
    } catch (err) {
      throw err
    }
  }
}

export default BaseRepository
