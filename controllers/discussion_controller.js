const discussions = require('express').Router()
const db = require('../models')
const { user_data, program, featured, discussion } = db
const { Op } = require('sequelize')
const Authentication = require('../controllers/authentication')


//Find all discussion 
discussions.get('/', async(req, res) => {
  res.send('hell yeah im a discussion!')
})

// Create a discussion || route may not be needed
discussions.post('/', (req, res) => {
  res.send('Got a POST request')
})

//Update a discussion
discussions.put('/discussions', (req, res) => {
  res.send('Got a PUT request at /discussion')
})

// Delete a discussion from the discussion page?
discussions.delete('/discussions', (req, res) => {
  res.send('Got a DELETE request at /discussion')
})

  
// exports
module.exports = discussions