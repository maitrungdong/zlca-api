'use strict'
import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {
  class Participants extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //Define associations here
    }
  }
  Participants.init(
    {
      userId: DataTypes.INTEGER,
      conversationId: DataTypes.INTEGER,
      joinedAt: DataTypes.DATE,
      leftAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Participants',
    }
  )
  return Participants
}
