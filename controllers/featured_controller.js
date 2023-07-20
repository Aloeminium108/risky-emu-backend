const featuredPrograms = require('express').Router()
const db = require('../models')
const { user_data, program, featured, discussion } = db
const { Op } = require('sequelize')
const Authentication = require('../controllers/authentication')


// FIND ALL FEATURED PROGRAMS
featuredPrograms.get('/', async (req, res) => {
  try {
      const foundFeatured = await featured.findAll({
          order: [ [ 'featured_id', 'ASC'] ],
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
      res.status(200).json(foundFeatured)
  } catch (error) {
      res.status(500).json(error)
  }
})

// CREATE A FEATURED PROGRAM

featuredPrograms.post('/', (req, res) => {
    res.send('Got a POST request')
  })

// UPDATE A FEATURED PROGRAM
featuredPrograms.put('/:id', async (req, res) => {
  try {
      const updatedFeatured = await featured.update(req.body, {
          where: {
              featured_id: req.params.id
          }
      })
      res.status(200).json({
          message: `Successfully updated ${updatedFeatured} featured program(s)`
      })
  } catch(err) {
      res.status(500).json(err)
  }
})

// DELETE A FEATURED PROGRAM
featuredPrograms.delete('/:id', async (req, res) => {
  try {
      const deletedFeatured = await featured.destroy({
          where: {
              featured_id: req.params.id
          }
      })
      res.status(200).json({
          message: `Successfully deleted ${deletedFeatured} featured program(s)`
      })
  } catch(err) {
      res.status(500).json(err)
  }
})

  
// exports
module.exports = featuredPrograms