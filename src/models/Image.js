'use strict'
import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //Define associations here
      Image.belongsTo(models.Message, {
        foreignKey: {
          name: 'messageId',
        },
        as: 'messageOfImage',
      })
    }
  }
  Image.init(
    {
      messageId: DataTypes.INTEGER,
      imageUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Image',
    }
  )
  return Image
}
