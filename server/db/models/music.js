const db = require('../db')
const Sequelize = require('sequelize')

const Music = db.define('music', {
  album: {
    type: Sequelize.TEXT,
  },
  song: {
    type: Sequelize.TEXT,
  },
  artist: {
    type: Sequelize.TEXT,
  }
})

module.exports = Music
