import ConversationsRepository from '../repositiories/conversationsRepository.js'
import UsersRepository from '../repositiories/usersRepository.js'

import Api404Error from '../../errors/api404Error.js'
import BadRequestError from '../../errors/badRequestError.js'

import bcrypt from 'bcryptjs'

class ConversationsService {
  constructor() {
    this.CONVER_REPO = new ConversationsRepository()
    this.USER_REPO = new UsersRepository()
  }

  async getAll(userId) {
    try {
      let conversations = null
      if (!userId) {
        conversations = await this.CONVER_REPO.getAll()
      } else {
        conversations = await this.CONVER_REPO.getAllConversOfUser(userId)
      }

      return {
        success: true,
        data: conversations,
        message: 'Get all conversations.',
      }
    } catch (err) {
      throw err
    }
  }

  async getById(id) {
    try {
      const excludeAttrs = []
      const conversation = await this.CONVER_REPO.getConverById(
        id,
        excludeAttrs
      )
      if (!conversation)
        throw new Api404Error(`The conversation with id: ${id} not found.`)

      return {
        success: true,
        data: conversation,
        message: 'Get conversation by id successfully.',
      }
    } catch (err) {
      throw err
    }
  }

  async create(conver) {
    try {
      //NOTE: Title can have or can't have. If have -> group chat, else -> friend chat.
      // if (!conver.title) {
      //   throw new BadRequestError('Please pass title param!')
      // }

      if (!conver.members || !conver.members.length >= 2) {
        throw new BadRequestError(
          'Please pass members param or params param is not valid!'
        )
      }

      const createdConver = await this.CONVER_REPO.create({
        title: conver.title,
        avatar: conver.avatar,
      })

      for (let i = 0; i < conver.members.length; i++) {
        const member = await this.USER_REPO.getById(conver.members[i])
        createdConver.addMember(member)
      }

      return {
        success: true,
        data: createdConver,
        message: 'The conver is created successfully.',
      }
    } catch (err) {
      throw err
    }
  }

  async hashPassword(password, saltRound = 10) {
    try {
      const salt = await bcrypt.genSalt(saltRound)
      const hashedPassword = await bcrypt.hash(password, salt)
      return hashedPassword
    } catch (err) {
      throw err
    }
  }

  async updateById(id, conver) {
    if (!id) throw new Api404Error(`The conver with ${id}: not found.`)

    const updatedConver = await this.CONVER_REPO.updateById(id, conver)

    return {
      success: true,
      data: updatedConver,
      message: `This conver is updated successfully.`,
    }
  }

  async deleteById(id) {
    try {
      if (!id) throw new Api404Error(`The user with id ${id}: not exist.`)
      const result = await this.CONVER_REPO.deleteById(id)
      if (result === 0)
        throw new Api404Error(`The user with id ${id}: not exist.`)

      return {
        success: true,
        data: result,
        message: 'The user is deleted successfully.',
      }
    } catch (err) {
      throw err
    }
  }
}

export default ConversationsService
