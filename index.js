// DEPENDENCIES
const express = require('express')
const cors = require('cors')
const app = express()
const { Sequelize } = require('sequelize')

// CONFIGURATION / MIDDLEWARE
require('dotenv').config()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// ROOT
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the Risky-Emu API'
    })
})

// CONTROLLERS 
app.use('/featured', featuredController)
app.use('/forum', forumController)
app.use('/editor', program_editorController)
app.use('/help', helpController)

// LISTEN
app.listen(process.env.PORT, () => {
    console.log(`Holding on by a thread on: ${process.env.PORT}`)
})