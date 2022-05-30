import ConversationsRepository from '../repositiories/conversationsRepository.js'
import UsersRepository from '../repositiories/usersRepository.js'
import ParticipantsRepository from '../repositiories/participantsRepository.js'

import Api404Error from '../../errors/api404Error.js'
import BadRequestError from '../../errors/badRequestError.js'

import bcrypt from 'bcryptjs'

class ConversationsService {
  constructor() {
    this.CONVER_REPO = new ConversationsRepository()
    this.USER_REPO = new UsersRepository()
    this.PARTI_REPO = new ParticipantsRepository()
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
          'Please pass members param or members param is not valid!'
        )
      }

      let createdConver = await this.CONVER_REPO.create({
        title: conver.title,
        avatar: conver.avatar,
      })

      for (let i = 0; i < conver.members.length; i++) {
        const member = await this.USER_REPO.getById(conver.members[i])
        createdConver.addMember(member)
      }

      console.log({ createdConver })

      return {
        success: true,
        data: createdConver,
        message: 'The conver is created successfully.',
      }
    } catch (err) {
      throw err
    }
  }

  async chatWithUser(members) {
    try {
      if (!members || !members.length >= 2) {
        throw new BadRequestError(
          'Please pass members param or members param is not valid!'
        )
      }

      //TODO: get conver of members.
      const mem01 = members[0]
      const partsOfMem01 = await this.PARTI_REPO.getByUserId(mem01.id)
      const mem02 = members[1]
      const partsOfMem02 = await this.PARTI_REPO.getByUserId(mem02.id)

      let existedConverId = null
      partsOfMem01.forEach((partOfMem01) => {
        partsOfMem02.forEach((partOfMem02) => {
          if (
            partOfMem01.dataValues.conversationId ===
            partOfMem02.dataValues.conversationId
          ) {
            existedConverId = partOfMem01.dataValues.conversationId
          }
        })
      })

      let converResult = null
      if (existedConverId) {
        const res = await this.getById(existedConverId)
        converResult = res.data
      } else {
        //Tạo conver mới:
        const newConver = {
          title: '',
          avatar: '',
          members: members.map((m) => m.id),
        }
        let res = await this.create(newConver)
        console.log({ res })
        res = await this.getById(res.data.dataValues.id)
        converResult = res.data
      }

      console.log({ converResult })

      return {
        success: true,
        data: {
          conver: converResult,
          isOld: !!existedConverId,
        },
        message: 'Successfully!',
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
