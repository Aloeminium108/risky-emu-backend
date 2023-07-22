const discussions = require('express').Router()
const db = require('../models')
const { user, program, discussion } = db


// FIND ALL DISCUSSIONS
discussions.get('/', async (req, res) => {
  try {
    const foundDiscussions = await discussion.findAll({
      order: [['discussion_id', 'ASC']],
      include: [
        {
          model: user,
          as: 'author',
          attributes: ['user_id', 'username']
        },
        {
          model: program,
          as: 'program',
          attributes: ['title', 'description']
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

// CREATE A DISCUSSION
discussions.post('/', async (req, res) => {

  if (req.currentUser === null) {
    return res.status(403).json({ message: 'You must be logged in to post a comment' })
  }

  try {
    const newDiscussion = await discussion.create({
      ...req.body
    })

    res.status(200).json(newDiscussion)

  } catch (err) {
    res.status(500).json(err)
  }

})

// UPDATE A DISCUSSION
discussions.put('/:id', async (req, res) => {

  const foundDiscussion = discussion.findOne({
    where: {
      discussion_id: req.params.id
    }
  })

  if (req.currentUser === null || req.currentUser.user_id !== foundDiscussion.user_id) {
    return res.status(403).json({ message: 'You cannot edit this user\'s comment' })
  }

  try {
    const updatedDiscussion = await discussion.update(req.body, {
      where: {
        discussion_id: req.params.id
      }
    })
    res.status(200).json({
      message: `Successfully updated ${updatedDiscussion} discussion(s)`
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

// DELETE A DISCUSSION
discussions.delete('/:id', async (req, res) => {

  const foundDiscussion = discussion.findOne({
    where: {
      discussion_id: req.params.id
    }
  })

  if (req.currentUser === null || req.currentUser.user_id !== foundDiscussion.user_id) {
    return res.status(403).json({ message: 'You cannot delete this user\'s comment' })
  }

  try {
    const deletedDiscussion = await discussion.destroy({
      where: {
        discussion_id: req.params.id
      }
    })
    res.status(200).json({
      message: `Successfully deleted ${deletedDiscussion} discussion(s)`
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

// exports
module.exports = discussions