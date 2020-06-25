'use strict'

const routes = require('express').Router()
const Controller = require('../controllers/productController')

routes.get('/', Controller.getProducts)

module.exports = routes