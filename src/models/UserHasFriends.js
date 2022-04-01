'use strict'
import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {
  class UserHasFriends extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //Define associations here
    }
  }
  UserHasFriends.init(
    {
      friendId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'UserHasFriends',
    }
  )
  return UserHasFriends
}
