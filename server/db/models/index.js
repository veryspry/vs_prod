const User = require('./user')
const Day = require('./day')
const Resource = require('./resource')
const Coffee = require('./coffee')
const Music = require('./music')


Resource.belongsTo(Day)
Day.hasMany(Resource)

Coffee.belongsTo(Day)
Day.hasMany(Coffee)

Music.belongsTo(Day)
Day.hasMany(Music)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  Day,
  Resource,
  Coffee,
  Music,
  User,
}
