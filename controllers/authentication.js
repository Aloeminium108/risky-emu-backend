const authentication = require('express').Router()
const db = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('json-web-token')

const { user } = db

authentication.post('/', async (req, res) => {

  const currentUser = await user.findOne({
    where: { username: req.body.username }
  })

  if (!currentUser || !await bcrypt.compare(req.body.password, currentUser.password_digest)) {
    res.status(401).json({
      message: "Incorrect username or password"
    })
  } else {
    const result = await jwt.encode(process.env.JWT_SECRET, { id: currentUser.user_id })
    res.status(200).json({ user: { user_id: currentUser.user_id, username: currentUser.username }, token: result.value })
  }

})

authentication.get('/profile', async (req, res) => {

  try {

    const [authenticationMethod, token] = req.headers.authorization.split(' ')

    if (authenticationMethod === 'Bearer') {
    
      const result = await jwt.decode(process.env.JWT_SECRET, token)

      console.log(result)
      const { id } = result.value

      let currentUser = await user.findOne({
        where: {
          user_id: id
        }
      })

      res.json(currentUser)
    }

  } catch {
    res.json(null)
  }

})

module.exports = authentication