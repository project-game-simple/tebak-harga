'use strict'

const {Product} = require('../models')

class Controller {
    static getProducts(req, res) {
        Product.findAll()
        .then(data => res.status(200).json(data))
        .catch(err => console.log(err))
    }
}

module.exports = Controller