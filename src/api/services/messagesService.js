import MessagesRepository from '../repositiories/messagesRepository.js'
import ConversationsRepository from '../repositiories/conversationsRepository.js'

import Api404Error from '../../errors/api404Error.js'
import BadRequestError from '../../errors/badRequestError.js'

class MessagesService {
  constructor() {
    this.MESS_REPO = new MessagesRepository()
    this.CONVER_REPO = new ConversationsRepository()
  }

  async getAll(conversationId) {
    try {
      let messages = []
      if (!conversationId) {
        messages = await this.MESS_REPO.getAll()
      } else {
        messages = await this.MESS_REPO.getAllMessagesOfConver(conversationId)
      }

      return {
        success: true,
        data: messages,
        message: 'Get all messages.',
      }
    } catch (err) {
      throw err
    }
  }

  async getById(id) {
    try {
      const message = await this.REPO.getById(id)
      if (!message)
        throw new Api404Error(`The message with id: ${id} not found.`)

      return {
        success: true,
        data: message,
        message: 'Get message by id successfully.',
      }
    } catch (err) {
      throw err
    }
  }

  async create(message) {
    try {
      if (!message.conversationId) {
        throw new BadRequestError('Please pass conversationId param!')
      }
      if (!message.senderId) {
        throw new BadRequestError('Please pass senderId param!')
      }
      if (!message.messageType) {
        throw new BadRequestError('Please pass messageType param!')
      }
      let result = await this.MESS_REPO.createMessage(message)

      if (result) {
        this.CONVER_REPO.updateById(result.dataValues.conversationId, {
          lastMessageId: result.dataValues.id,
        })
      }

      return {
        success: true,
        data: result,
        message: 'The users is created successfully.',
      }
    } catch (err) {
      throw err
    }
  }
}

export default MessagesService
