const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = mongoose.model('User')

const router = express.Router()

router.post('/auth/register', async (req, res) => {
  const {email, password, username, first_name, last_name} = req.body
  try {
    const user = new User({email, password, username, first_name, last_name})
    await user.save()

    const token = jwt.sign({userId: user._id}, 'MY_SECRET_KEY')
    console.log('🚀 ~ file: authRoutes.js:21 ~ router.post ~ token', token)
    res.send({token})
  } catch (error) {
    return res.status(422).send(error.message)
  }
})

router.post('/auth/login', async (req, res) => {
  const {username, password} = req.body
  console.log(
    '🚀 ~ file: authRoutes.js:24 ~ router.post ~ username, password:',
    username,
    password,
  )

  if (!username || !password) {
    console.log('sin username o password')
    return res.status(422).send({error: 'Must provide username and password'})
  }

  const user = await User.findOne({username})
  console.log('🚀 ~ file: authRoutes.js:36 ~ router.post ~ user:', user)
  if (!user) {
    console.log('usuario no encontrado')
    return res.status(404).send({error: 'Username not found'})
  }

  try {
    await user.comparePassword(password)
    const token = jwt.sign({userId: user._id}, 'MY_SECRET_KEY')
    res.send({token, user})
    console.log(
      '🚀 ~ file: authRoutes.js:46 ~ router.post ~ token, user:',
      token,
      user,
    )
  } catch (error) {
    console.log('username o password inválido')
    return res.status(422).send({error: 'Invalid password or username'})
  }
})

module.exports = router
