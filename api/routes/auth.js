const express = require('express')
const Router = express.Router
const router = Router()
const { issueToken } = require('../middleware/auth')
const User = require('../models/userModel')

const findUserByEmail = async (req, res, next) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (user) {
      const match = await user.comparePassword(password)

      if (match) {
        req.user = user
        next()
      } else {
        res.sendStatus(403)
        //next(new Error('Unathorized'))
      }
    } else {
      res.sendStatus(403);
      //next(new Error('not found'))
    }
  } catch (e) {
    next(e)
  }
}

router.post('/login', findUserByEmail, issueToken, async (req, res, next) => {
  const { token } = req
  if (token) {
    res.status(200).json({ token })
  } else {
    next(new Error('internal server error'))
  }
})

router.post('/signup', (req, res) => {
  const { email, password, nickname } = req.body
  const user = new User({ email, password, nickname })
  console.log('server ', user)
  user
    .save()
    .then(doc => {
      res.status(200).json({
        message: 'success',
        payload: doc
      })
    })
    .catch(err => {
      res.status(500).json({ message: err.message })
    })
})

module.exports = router;
