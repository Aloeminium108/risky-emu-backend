const users = require('express').Router()
const db = require('../models')
// const { fill in models here } = db
// const { Op } = require('sequelize')


//Find all users 

users.get('/', async(req, res) => {
    res.send('hell yeah im a user!')
})

// Create a user|| route may not be needed

users.post('/', (req, res) => {
    res.send('Got a POST request')
  })

//Update a user

users.put('/user', (req, res) => {
    res.send('Got a PUT request at /user')
  })

// Delete a user from the db

users.delete('/user', (req, res) => {
    res.send('Got a DELETE request at /user')
  })

  
// exports
module.exports = user