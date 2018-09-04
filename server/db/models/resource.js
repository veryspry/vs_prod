const db = require('../db')
const Sequelize = require('sequelize')


const Resource = db.define('resources', {
  name: {
    type: Sequelize.TEXT
  },
  resourceUrl: {
    type: Sequelize.TEXT,
    validate: {
      isUrl: true
    }
  }
})

module.exports = Resource
