import express from 'express'

import { httpStatusCode } from '../../utils/constants.js'

import UsersService from '../services/usersService.js'

const router = express.Router()
const SERVICE = new UsersService()

//Get all users
router.get('/', async (req, res, next) => {
  try {
    const result = await SERVICE.getAll()
    res.status(httpStatusCode.OK).json(result)
  } catch (err) {
    next(err)
  }
})

//Get user by id
router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const result = await SERVICE.getById(id)
    res.status(httpStatusCode.OK).json(result)
  } catch (err) {
    next(err)
  }
})

//Update user by id
router.put('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const user = {
      fullName: req.body.fullName,
      phoneNumber: req.body.phoneNumber,
      password: req.body.password,
      avatar: req.body.avatar,
      lastOnline: req.body.lastOnline,
      isOnline: req.body.isOnline,
    }

    const result = await SERVICE.updateById(id, user)
    res.status(httpStatusCode.OK).json(result)
  } catch (err) {
    next(err)
  }
})

//Delete user by id
router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const result = await SERVICE.deleteById(id)
    res.status(httpStatusCode.OK).json(result)
  } catch (err) {
    next(err)
  }
})

export default router
