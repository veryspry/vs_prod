const db = require('../db')
const Sequelize = require('sequelize')

const Coffee = db.define('coffee', {
  name: {
    type: Sequelize.TEXT
  },
  roaster: {
    type: Sequelize.TEXT
  }
})

module.exports = Coffee
