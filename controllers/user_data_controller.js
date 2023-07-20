const users = require('express').Router()
const db = require('../models')
const bcrypt = require('bcrypt')
const { user, program, discussion } = db
const { Op } = require('sequelize')


// FIND ALL USERS
users.get('/', async (req, res) => {
  try {
    const foundUsers = await user.findAll({
      order: [['user_id', 'ASC']],
      where: {
        username: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
      },
      include: [
        {
          model: program,
          as: 'programs'
        },
        {
          model: discussion,
          as: 'discussions'
        }
      ]
    })
    res.status(200).json(foundUsers)
  } catch (error) {
    res.status(500).json({ ...error })
  }
})

// FIND A SPECIFIC USER
users.get('/:id', async (req, res) => {
  try {
    const foundUser = await user.findOne({
      where: { user_id: req.params.id }
    })
    res.status(200).json(foundUser)
  } catch (error) {
    res.status(500).json(error)
  }
})

// CREATE A USER
users.post('/', async (req, res) => {
  let { password, ...rest } = req.body

  const newUser = await user.create({
    ...rest,
    password_digest: await bcrypt.hash(password, 10)
  })

  res.json(newUser)
})

// UPDATE A USER
users.put('/:id', async (req, res) => {
  try {
    const updatedUser = await user.update(req.body, {
      where: {
        user_id: req.params.id
      }
    })
    res.status(200).json({
      message: `Successfully updated ${updatedUser} user(s)`
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

// DELETE A USER
users.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await user.destroy({
      where: {
        user_id: req.params.id
      }
    })
    res.status(200).json({
      message: `Successfully deleted ${deletedUser} user(s)`
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

// LOGOUT A USER


// exports
module.exports = users