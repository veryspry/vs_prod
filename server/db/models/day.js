const db = require('../db')
const Sequelize = require('sequelize')

const Day = db.define('days', {
  // date: {
  //   type: Sequelize.DATE,
  //   allowNull: false
  // },
  month: {
    type: Sequelize.TEXT,
   //  set (valueToBeSet) { // format the month
   //   this.setDataValue('month', valueToBeSet.slice(0, 1).toUpperCase() + valueToBeSet.slice(1).toLowerCase())
   // }
  },
  day: {
    type: Sequelize.TEXT,
  },
  year: {
    type: Sequelize.TEXT,
  },
  focus: {
    type: Sequelize.TEXT,
  }
})

module.exports = Day
