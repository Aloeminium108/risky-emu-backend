const featuredPrograms = require('express').Router()
const db = require('../models')
const { user, program, feature } = db


// FIND ALL FEATURED PROGRAMS
featuredPrograms.get('/', async (req, res) => {
  try {
    const foundFeatured = await feature.findAll({
      order: [['createdAt', 'ASC']],
      include: [
        {
          model: program,
          as: 'program',
          attributes: ['title', 'description'],
          include: [
            {
              model: user,
              as: 'author',
              attributes: ['user_id', 'username']
            }
          ]
        }
      ]
    })
    res.status(200).json(foundFeatured)
  } catch (error) {
    res.status(500).json(error)
  }
})

// CREATE A FEATURED PROGRAM
featuredPrograms.post('/', (req, res) => {

  if (req.currentUser === null || req.currentUser.role !== 'admin') {
    return res.status(403).json({ message: 'You must be an admin to add programs to the featured list' })
  }

  res.send('Got a POST request')
})

// UPDATE A FEATURED PROGRAM
featuredPrograms.put('/:id', async (req, res) => {

  if (req.currentUser === null || req.currentUser.role !== 'admin') {
    return res.status(403).json({ message: 'You must be an admin to add programs to modify the featured list' })
  }

  try {
    const updatedFeatured = await feature.update(req.body, {
      where: {
        featured_id: req.params.id
      }
    })
    res.status(200).json({
      message: `Successfully updated ${updatedFeatured} featured program(s)`
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

// DELETE A FEATURED PROGRAM
featuredPrograms.delete('/:id', async (req, res) => {

  if (req.currentUser === null || req.currentUser.role !== 'admin') {
    return res.status(403).json({ message: 'You must be an admin to remove programs from the featured list' })
  }

  try {
    const deletedFeatured = await feature.destroy({
      where: {
        featured_id: req.params.id
      }
    })
    res.status(200).json({
      message: `Successfully deleted ${deletedFeatured} featured program(s)`
    })
  } catch (err) {
    res.status(500).json(err)
  }
})


// exports
module.exports = featuredPrograms