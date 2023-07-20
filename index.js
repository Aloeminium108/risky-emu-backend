// MODULES AND GLOBALS
const express = require('express')
const app = express()
const defineCurrentUser = require('./middleware/defineCurrentUser')

// EXPRESS SETTINGS
require('dotenv').config()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(defineCurrentUser)

// CORS is necessary for local testing but breaks in Vercel
if (process.env.LOCAL && parseInt(process.env.LOCAL) === 1) {
  const corsOptions = {
    origin: process.env.ORIGIN,
    credentials:  true
  }
  const cors = require('cors')
  app.use(cors(corsOptions))
}

// ROOT
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the Risky-Emu API'
  })
})

// CONTROLLERS 
app.use('/authentication', require('./controllers/authentication'))
app.use('/discussion', require('./controllers/discussion_controller'))
app.use('/featured', require('./controllers/featured_controller'))
app.use('/program', require('./controllers/program_controller'))
app.use('/user', require('./controllers/user_data_controller'))


// LISTEN
app.listen(process.env.PORT, () => {
  console.log(`Hanging on by a thread on: ${process.env.PORT}`)
})