'use strict'

const routes = require('express').Router()
const Controller = require('../controllers/productController')

// console.log('ini index')

// routes.get('/', (req, res) => {
//     console.log('ini index routes')
// })

routes.get('/', Controller.getProducts)

module.exports = routes