'use strict'
const { User } = require('../models');

class Controller {
    static add(name, RoomId) {
        return User.create({
            name, RoomId
        });
    }
    static addScore(nickname){
        User.findOne({ where: { name: nickname }})
          .then(data => {
              return User.update({
                score: data.score +20 
              },
              {
                where: { name: nickname }
              })
          })
    }
}
module.exports = Controller;