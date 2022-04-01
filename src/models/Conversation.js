'use strict'
import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {
  class Conversation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //Define associations here
      Conversation.belongsTo(models.Message, {
        foreignKey: {
          name: 'lastMessageId',
        },
        as: 'lastMessage',
      })

      Conversation.hasMany(models.Message, {
        foreignKey: {
          name: 'conversationId',
        },
        as: 'messagesOfConver',
      })

      Conversation.belongsToMany(models.User, {
        through: models.Participants,
        foreignKey: 'conversationId',
        otherKey: 'userId',
        as: 'members',
      })
    }
  }
  Conversation.init(
    {
      lastMessageId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      avatar: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Conversation',
    }
  )
  return Conversation
}
