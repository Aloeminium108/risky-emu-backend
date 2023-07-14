const thread = require('express').Router()
const db = require('../models')
// const { fill in models here } = db
// const { Op } = require('sequelize')

//Find all programs

thread.get('/', async(req, res) => {
    res.send('hell yeah im a thread!')
})

// Create a thread

thread.post('/', (req, res) => {
    res.send('Got a POST request')
  })

//Update a thread

thread.put('/thread', (req, res) => {
    res.send('Got a PUT request at /thread')
  })

// Delete a thread from the thread page?

thread.delete('/thread', (req, res) => {
    res.send('Got a DELETE request at /thread')
  })


// exports
module.exports = thread