const programs = require('express').Router()
const db = require('../models')
const { user_data, program, featured, discussion } = db
const { Op } = require('sequelize')
const Authentication = require('../controllers/authentication')


// FIND ALL PROGRAMS
programs.get('/', async (req, res) => {
  try {
      const foundPrograms = await program.findAll({
          order: [ [ 'program_id', 'ASC'] ],
          include: [
              {
                  model: user_data,
                  as: 'user'
              }
          ]
      })
      res.status(200).json(foundPrograms)
  } catch (error) {
      res.status(500).json(error)
  }
})

// CREATE A PROGRAM

programs.post('/', (req, res) => {
    res.send('Got a POST request')
  })

// UPDATE A PROGRAM
programs.put('/:id', async (req, res) => {
  try {
      const updatedProgram = await program.update(req.body, {
          where: {
              program_id: req.params.id
          }
      })
      res.status(200).json({
          message: `Successfully updated ${updatedProgram} program(s)`
      })
  } catch(err) {
      res.status(500).json(err)
  }
})

// DELETE A PROGRAM
programs.delete('/:id', async (req, res) => {
  try {
      const deletedProgram = await program.destroy({
          where: {
              program_id: req.params.id
          }
      })
      res.status(200).json({
          message: `Successfully deleted ${deletedProgram} program(s)`
      })
  } catch(err) {
      res.status(500).json(err)
  }
})


// exports
module.exports = program_data