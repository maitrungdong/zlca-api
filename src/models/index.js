'use strict'

import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import Sequelize from 'sequelize'
import { readFile } from 'fs/promises'

//Import manually
import AllCode from './AllCode.js'
import Conversation from './Conversation.js'
import UserHasFriends from './UserHasFriends.js'
import Image from './Image.js'
import Message from './Message.js'
import Participants from './Participants.js'
import User from './User.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'development'
const config = JSON.parse(
  await readFile(new URL('../config/config.json', import.meta.url))
)[env]

const db = {}

let sequelize
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config)
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  )
}

const allCodeModel = AllCode(sequelize, Sequelize.DataTypes)
const conversationModel = Conversation(sequelize, Sequelize.DataTypes)
const userHasFriendModel = UserHasFriends(sequelize, Sequelize.DataTypes)
const imageModel = Image(sequelize, Sequelize.DataTypes)
const messageModel = Message(sequelize, Sequelize.DataTypes)
const participantsModel = Participants(sequelize, Sequelize.DataTypes)
const userModle = User(sequelize, Sequelize.DataTypes)

db[allCodeModel.name] = allCodeModel
db[conversationModel.name] = conversationModel
db[userHasFriendModel.name] = userHasFriendModel
db[imageModel.name] = imageModel
db[messageModel.name] = messageModel
db[participantsModel.name] = participantsModel
db[userModle.name] = userModle

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

export default db

// export default (async () => {
//   const files = fs
//     .readdirSync(__dirname)
//     .filter(
//       (file) =>
//         file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
//     )

//   await Promise.all(
//     files.map(async (file) => {
//       const m = await import(`./${file}`)
//       const model = m.default(sequelize, Sequelize.DataTypes)
//       db[model.name] = model
//     })
//   )

//   Object.keys(db).forEach((modelName) => {
//     if (db[modelName].associate) {
//       db[modelName].associate(db)
//     }
//   })

//   db.sequelize = sequelize
//   db.Sequelize = Sequelize

//   console.log('++++++++Built models++++++++')
//   return db
// })()
