'use strict'
import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //Define associations here
      User.belongsToMany(models.User, {
        through: models.UserHasFriends,
        foreignKey: 'userId',
        otherKey: 'friendId',
        as: 'friends',
      })

      User.belongsToMany(models.Conversation, {
        through: models.Participants,
        foreignKey: 'userId',
        otherKey: 'conversationId',
        as: 'conversations',
      })

      User.hasMany(models.Message, {
        foreignKey: {
          name: 'senderId',
        },
        as: 'messagesOfUser',
      })
    }
  }
  User.init(
    {
      phoneNumber: DataTypes.STRING,
      password: DataTypes.STRING,
      fullName: DataTypes.STRING,
      avatar: DataTypes.STRING,
      lastOnline: DataTypes.DATE,
      isOnline: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'User',
    }
  )
  return User
}
