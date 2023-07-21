const programs = require('express').Router()
const db = require('../models')
const { user, program } = db
const { Op } = require('sequelize')
const Authentication = require('../controllers/authentication')


// FIND ALL PROGRAMS
programs.get('/', async (req, res) => {
  try {
    const foundPrograms = await program.findAll({
      order: [['program_id', 'ASC']],
      include: [
        {
          model: user,
          as: 'author'
        }
      ]
    })
    res.status(200).json(foundPrograms)
  } catch (error) {
    res.status(500).json(error)
  }
})

// FIND PROGRAM BY ID
programs.get('/:id', async (req, res) => {
  try {
    const foundProgram = await program.findOne(req.body, {
      where: {
        program_id: req.params.id
      },
      include: [
        {
          model: user,
          as: 'author'
        }
      ]
    })
    res.status(200).json({
      title: foundProgram.title,
      author: foundProgram.author,
      source_code: foundProgram.source_code,
      binary: foundProgram.binary,
      description: foundProgram.description
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

// CREATE A PROGRAM
programs.post('/', async (req, res) => {

  if (req.currentUser === null) {
    console.log('Current user:', req.currentUser)
    return res.status(403).json({ message: 'You must be logged in to post a program' })
  }

  let { binary, ...rest } = req.body

  console.log(binary)
  console.log(typeof binary)

  const newProgram = await program.create({
    ...rest,
    user_id: req.currentUser.user_id,
    binary: Buffer.from(binary)
  })

  res.json(newProgram)
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
  } catch (err) {
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
  } catch (err) {
    res.status(500).json(err)
  }
})


// exports
module.exports = programs