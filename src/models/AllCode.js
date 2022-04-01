'use strict'
import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {
  class AllCode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //Define associations here
      AllCode.hasMany(models.Message, {
        foreignKey: {
          name: 'messageType',
        },
        sourceKey: 'type',
        as: 'messagesOfType',
      })
    }
  }
  AllCode.init(
    {
      value: DataTypes.STRING,
      type: DataTypes.STRING,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'AllCode',
    }
  )
  return AllCode
}
