import BaseRepository from './baseRepository.js'
import db from '../../models/index.js'
import { messageType } from '../../utils/constants.js'

const MESS_TABLE = db.Message
const CONVER_TABLE = db.Conversation

const ID_FIELD = 'id'

class MessasgesRepository extends BaseRepository {
  constructor() {
    super(MESS_TABLE, ID_FIELD)
  }

  async getAllMessagesOfConver(converId) {
    try {
      const messageOfConversation = await CONVER_TABLE.findOne({
        where: {
          id: converId,
        },
        include: {
          model: db.Message,
          as: 'messagesOfConver',
        },
      })

      if (messageOfConversation?.dataValues?.messagesOfConver) {
        for (
          let i = 0;
          i < messageOfConversation.dataValues.messagesOfConver.length;
          i++
        ) {
          const message = messageOfConversation.dataValues.messagesOfConver[i]
          message.dataValues.images = await message.getImagesOfMess()
          message.dataValues.sender = await message.getSenderOfMess()
        }
      }

      return messageOfConversation
    } catch (err) {
      throw err
    }
  }

  async createMessage(message) {
    try {
      const createdMessage = await MESS_TABLE.create(message)

      if (message.images) {
        for (let i = 0; i < message.images.length; i++) {
          if (message.images[i]) {
            await createdMessage.createImagesOfMess({
              imageUrl: message.images[i],
            })
          }
        }
      }

      if (createdMessage.dataValues) {
        createdMessage.dataValues.sender =
          await createdMessage.getSenderOfMess()

        createdMessage.dataValues.images =
          await createdMessage.getImagesOfMess()
      }

      return createdMessage
    } catch (err) {
      throw err
    }
  }
}

export default MessasgesRepository
