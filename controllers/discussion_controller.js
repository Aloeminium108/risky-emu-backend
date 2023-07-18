const discussions = require('express').Router()
const db = require('../models')
const { discussion, user_data } = db
const { Op } = require('sequelize')


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
module.exports = discussion_data