import express from 'express'

import { logErrorMiddleware, returnError } from './src/errors/errorHandler.js'

import usersCtrl from './src/api/controllers/usersController.js'
import authCtrl from './src/api/controllers/authController.js'
import conversationsCtrl from './src/api/controllers/conversationsController.js'
import messagesCtrl from './src/api/controllers/messagesController.js'

const router = express.Router()

router.get('/', (req, res) => {
  res.send('Welcome to Chat Application API service!')
})

router.use('/api/users', usersCtrl)
router.use('/api/auth', authCtrl)
router.use('/api/conversations', conversationsCtrl)
router.use('/api/messages', messagesCtrl)

router.use(logErrorMiddleware)
router.use(returnError)

export default router
