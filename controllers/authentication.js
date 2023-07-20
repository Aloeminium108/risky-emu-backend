const authentication = require('express').Router()
const db = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('json-web-token')

const { user_data } = db

authentication.post('/', async (req, res) => {

  const user = await user_data.findOne({
    where: { user: req.body.user }
  })

  if (!user || !await bcrypt.compare(req.body.password, user.password_digest)) {
    res.status(401).json({
      message: "Incorrect username or password"
    })
  } else {
    const result = await jwt.encode(process.env.JWT_SECRET, { id: user.userId })
    res.status(200).json({ user: user, token: result.value })
  }

})

authentication.get('/profile', async (req, res) => {
  res.json(req.currentUser)
})

module.exports = authentication