const featured = require('express').Router()
const db = require('../models')
// const { fill in models here } = db
// const { Op } = require('sequelize')


//Find all featured programs

featured.get('/', async(req, res) => {
    res.send('hell yeah im featured!')
})

// Create a featured program || route may not be needed

featured.post('/', (req, res) => {
    res.send('Got a POST request')
  })

//Update a featured program

featured.put('/featured', (req, res) => {
    res.send('Got a PUT request at /featured')
  })

// Delete a featured program from the feature page?

featured.delete('/featured', (req, res) => {
    res.send('Got a DELETE request at /featured')
  })

  
// exports
module.exports = featured