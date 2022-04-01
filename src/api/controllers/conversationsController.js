import express from 'express'

import { httpStatusCode } from '../../utils/constants.js'

import ConversationsService from '../services/conversationsService.js'

const router = express.Router()
const CONVER_SV = new ConversationsService()

//Get all conversations of user
router.get('/', async (req, res, next) => {
  try {
    const userId = req.query.userId
    const result = await CONVER_SV.getAll(userId)
    res.status(httpStatusCode.OK).json(result)
  } catch (err) {
    next(err)
  }
})

//Get conversation by id
router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const result = await CONVER_SV.getById(id)
    res.status(httpStatusCode.OK).json(result)
  } catch (err) {
    next(err)
  }
})

//Create a conversation
router.post('/', async (req, res, next) => {
  try {
    const conversation = {
      title: req.body.title,
      avatar:
        req.body.avatar ||
        'https://api-private.atlassian.com/users/8f525203adb5093c5954b43a5b6420c2/avatar',
      members: req.body.members,
    }
    const result = await CONVER_SV.create(conversation)
    res.status(httpStatusCode.CREATED).json(result)
  } catch (err) {
    next(err)
  }
})

//Update conversation by id
router.put('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const conver = {
      lastMessageId: req.body.lastMessageId || undefined,
      title: req.body.title || undefined,
      avatar: req.body.avatar || undefined,
    }

    const result = await CONVER_SV.updateById(id, conver)
    res.status(httpStatusCode.OK).json(result)
  } catch (err) {
    next(err)
  }
})

//Delete conversation by id
// router.delete('/:id', async (req, res, next) => {
//   try {
//     const id = req.params.id
//     const result = await CONVER_SV.deleteById(id)
//     res.status(httpStatusCode.OK).json(result)
//   } catch (err) {
//     next(err)
//   }
// })

export default router
