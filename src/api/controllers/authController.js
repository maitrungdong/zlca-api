import express from 'express'

import { httpStatusCode } from '../../utils/constants.js'

import AuthService from '../services/authService.js'
import UsersService from '../services/usersService.js'

const router = express.Router()

const AUTH_SV = new AuthService()
const USER_SV = new UsersService()

//Sign in
router.post('/sign-in', async (req, res, next) => {
  try {
    const userInfo = {
      phoneNumber: req.body.phoneNumber,
      password: req.body.password,
    }

    const result = await AUTH_SV.signIn(userInfo)
    res.status(httpStatusCode.OK).json(result)
  } catch (err) {
    next(err)
  }
})

//Sign up an user
router.post('/sign-up', async (req, res, next) => {
  try {
    const user = {
      fullName: req.body.fullName,
      phoneNumber: req.body.phoneNumber,
      password: req.body.password,
      avatar:
        req.body.avatar ||
        'https://api-private.atlassian.com/users/8f525203adb5093c5954b43a5b6420c2/avatar',
    }
    const result = await USER_SV.create(user)
    res.status(httpStatusCode.CREATED).json(result)
  } catch (err) {
    next(err)
  }
})

//Sign out
router.post('/sign-out', async (req, res, next) => {
  try {
    const userId = req.body.userId
    const result = await AUTH_SV.signOut(userId)
    res.status(httpStatusCode.CREATED).json(result)
  } catch (err) {
    next(err)
  }
})

export default router
