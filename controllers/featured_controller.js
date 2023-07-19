const feature = require('express').Router()
const db = require('../models')
const { user_data, program, featured, discussion } = db
const { Op } = require('sequelize')
const Authentication = require('../controllers/authentication')


//Find all featured programs

feature.get('/', async(req, res) => {
    res.send('hell yeah im featured!')
})

// Create a featured program || route may not be needed

feature.post('/', (req, res) => {
    res.send('Got a POST request')
  })

//Update a featured program

feature.put('/featured', (req, res) => {
    res.send('Got a PUT request at /featured')
  })

// Delete a featured program from the feature page?

feature.delete('/featured', (req, res) => {
    res.send('Got a DELETE request at /featured')
  })

  
// exports
module.exports = featured_program