import BaseRepository from './baseRepository.js'
import db from '../../models/index.js'

const CONVER_TABLE = db.Conversation
const USER_TABLE = db.User

const ID_FIELD = 'id'

class ConversationsRepository extends BaseRepository {
  constructor() {
    super(CONVER_TABLE, ID_FIELD)
  }

  async getAllConversOfUser(userId) {
    try {
      const convers = await USER_TABLE.findOne({
        where: {
          id: userId,
        },
        attributes: {
          exclude: ['password'],
        },
        include: {
          model: db.Conversation,
          as: 'conversations',
        },
      })

      if (convers?.dataValues?.conversations) {
        for (let i = 0; i < convers.dataValues.conversations.length; i++) {
          const conver = convers.dataValues.conversations[i]
          conver.dataValues.members = await conver.getMembers({
            attributes: { exclude: ['password'] },
          })
          conver.dataValues.lastMessage = await conver.getLastMessage()
        }
      }

      return convers
    } catch (err) {
      throw err
    }
  }
}

export default ConversationsRepository
