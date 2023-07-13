const featured = require('express').Router()
const db = require('../models')
// const { fill in models here } = db
// const { Op } = require('sequelize')

featured.get('/', async(req, res) => {
    res.send('hell yeah im featured!')
})



// exports
module.exports = featured