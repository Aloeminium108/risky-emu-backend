const discussions = require('express').Router()
const db = require('../models')
const { user_data, program, featured, discussion } = db
const { Op } = require('sequelize')
const Authentication = require('../controllers/authentication')


// FIND ALL DISCUSSIONS
discussions.get('/', async (req, res) => {
  try {
      const foundDiscussions = await discussion.findAll({
          order: [ [ 'discussion_id', 'ASC'] ],
          include: [
              {
                  model: user_data,
                  as: 'user'
              },
              {
                  model: program,
                  as: 'programs'
              }
          ]
      })
      res.status(200).json(foundDiscussions)
  } catch (error) {
      res.status(500).json(error)
  }
})

// FIND ALL DISCUSSIONS TIED TO A PROGRAM
discussions.get('/discussion/:id', async (req, res) => {
  try {
      const foundDiscussions = await discussion.findAll({
          where: { program_id: req.params.id }
      })
      res.status(200).json(foundDiscussions)
  } catch (error) {
      res.status(500).json(error)
  }
})

// Create a discussion || route may not be needed

discussions.post('/', (req, res) => {
    res.send('Got a POST request')
  })

// UPDATE A DISCUSSION
discussions.put('/:id', async (req, res) => {
  try {
      const updatedDiscussion = await discussion.update(req.body, {
          where: {
              discussion_id: req.params.id
          }
      })
      res.status(200).json({
          message: `Successfully updated ${updatedDiscussion} discussion(s)`
      })
  } catch(err) {
      res.status(500).json(err)
  }
})

// DELETE A DISCUSSION
discussions.delete('/:id', async (req, res) => {
  try {
      const deletedDiscussion = await discussion.destroy({
          where: {
              discussion_id: req.params.id
          }
      })
      res.status(200).json({
          message: `Successfully deleted ${deletedDiscussion} discussion(s)`
      })
  } catch(err) {
      res.status(500).json(err)
  }
})

// exports
module.exports = discussion_data