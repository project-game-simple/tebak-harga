'use strict'

const { Room, User } = require('../models');

class Controller {
    static addRoom(name, admin) {
        return Room.create({
            name, admin
        })
    }
    static getRooms(){
        return Room.findAll({ include: [User] });
    }
    static findOne(roomId){
        return Room.findByPk(Number(roomId), { include: [User] });
    }
    // static deleteUser(roomId, ) // buat leave room
}
module.exports = Controller;