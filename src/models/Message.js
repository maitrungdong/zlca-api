'use strict'
import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //Define associations here

      Message.belongsTo(models.AllCode, {
        foreignKey: {
          name: 'messageType',
        },
        targetKey: 'type',
        as: 'typeOfMess',
      })

      Message.hasMany(models.Image, {
        foreignKey: {
          name: 'messageId',
        },
        as: 'imagesOfMess',
      })

      Message.hasOne(models.Conversation, {
        foreignKey: {
          name: 'lastMessageId',
        },
        as: 'converOfLastMess',
      })

      Message.belongsTo(models.Conversation, {
        foreignKey: {
          name: 'conversationId',
        },
        as: 'converOfMess',
      })

      Message.belongsTo(models.User, {
        foreignKey: {
          name: 'senderId',
        },
        as: 'senderOfMess',
      })
    }
  }
  Message.init(
    {
      conversationId: DataTypes.INTEGER,
      senderId: DataTypes.INTEGER,
      repliedMessageId: DataTypes.INTEGER,
      messageType: DataTypes.STRING,
      isDeleted: DataTypes.BOOLEAN,
      textContent: DataTypes.TEXT,
      link: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Message',
    }
  )
  return Message
}
