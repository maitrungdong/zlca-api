import express from 'express'

import { httpStatusCode } from '../../utils/constants.js'

import MessagesService from '../services/messagesService.js'

const router = express.Router()
const MESS_SV = new MessagesService()

//Get all messages of conversation
router.get('/', async (req, res, next) => {
  try {
    const converId = req.query.converId
    const result = await MESS_SV.getAll(converId)
    res.status(httpStatusCode.OK).json(result)
  } catch (err) {
    next(err)
  }
})

//Get message by id
router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const result = await MESS_SV.getById(id)
    res.status(httpStatusCode.OK).json(result)
  } catch (err) {
    next(err)
  }
})

//Create message
router.post('/', async (req, res, next) => {
  try {
    const message = {
      conversationId: req.body.conversationId,
      senderId: req.body.senderId,
      repliedMessageId: req.body.repliedMessageId,
      messageType: req.body.messageType,
      textContent: req.body.textContent,
      link: req.body.link,
      images: req.body.images,
    }
    const result = await MESS_SV.create(message)
    res.status(httpStatusCode.CREATED).json(result)
  } catch (err) {
    next(err)
  }
})

export default router