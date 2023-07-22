const programs = require('express').Router()
const db = require('../models')
const { user, program } = db


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
    const foundProgram = await program.findOne({
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
    console.log(err)
    res.status(500).json(err)
  }
})

// CREATE A PROGRAM
programs.post('/', async (req, res) => {

  if (req.currentUser === null) {
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

  const foundProgram = await program.findOne({
    where: {
      program_id: req.params.id
    }
  })

  if (req.currentUser === null || req.currentUser.user_id !== foundProgram.user_id) {
    return res.status(403).json({ message: 'You must be logged in as the author to edit this program' })
  }

  try {
    const updatedProgram = await program.update({ binary: Buffer.from(req.body.binary), ...req.body }, {
      where: {
        program_id: req.params.id
      }
    })
    res.status(200).json({
      message: `Successfully updated`
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

// DELETE A PROGRAM
programs.delete('/:id', async (req, res) => {

  if (req.currentUser === null || req.currentUser.user_id !== foundProgram.user_id) {
    return res.status(403).json({ message: 'You must be logged in as the author to delete this program' })
  }

  try {
    const deletedProgram = await program.destroy({
      where: {
        program_id: req.params.id
      }
    })
    res.status(200).json({
      message: `Successfully deleted ${deletedProgram.title}`
    })
  } catch (err) {
    res.status(500).json(err)
  }
})


// exports
module.exports = programs