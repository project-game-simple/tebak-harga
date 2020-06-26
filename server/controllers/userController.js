'use strict'
const { User } = require('../models');

class Controller {
    static add(name, RoomId) {
        return User.create({
            name, RoomId
        });
    }
}
module.exports = Controller;