'use strict'

const {Product} = require('../models')

class Controller {
    static getProducts(req, res, next) {
        Product.findAll()
        .then(data => res.status(200).json(data))
        .catch(err => next(err))
    }
}

module.exports = Controller