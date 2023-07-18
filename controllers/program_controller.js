const programs = require('express').Router()
const db = require('../models')
const { program, user_data } = db
const { Op } = require('sequelize')

//Find all programs

programs.get('/', async(req, res) => {
    res.send('hell yeah im a program!')
})

// Create a program || route may not be needed

programs.post('/', (req, res) => {
    res.send('Got a POST request')
  })

//Update a program

programs.put('/programs', (req, res) => {
    res.send('Got a PUT request at /programs')
  })

// Delete a program from the program page?

programs.delete('/programs', (req, res) => {
    res.send('Got a DELETE request at /programs')
  })


// exports
module.exports = program_data