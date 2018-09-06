const router = require('express').Router()
const { Day, Resource, Coffee, Music } = require('../db/models')
module.exports = router

// GET THE TIMELINE
router.get('/', async (req, res, next) => {
  try {
    const response = await Day.findAll({
      include: [
        {model: Resource},
        {model: Coffee},
        {model: Music}
      ],
      order: [ ['createdAt', 'DESC'] ] // get back our days in order from newest to oldest
    })
    res.send(response) // TEST CHANGING THIS TO JSON
  }
  catch (err) {
    next(err)
  }
})

// GET SPECIFIC DAY
router.get('/:id', async (req, res, next) => {
  try {
    const response = await Day.findById(req.params.id, {
      include: [
        {model: Resource},
        {model: Coffee},
        {model: Music}
      ]
    })
    res.send(response)
  }
  catch (err) {
    next(err)
  }
})

// UPDATE SPECIFIC DAY
router.put('/update/:id', async (req, res, next) => {
  try {
    const response = await Day.update({
      month: req.body.month,
      day: req.body.day,
      year: req.body.year,
      focus: req.body.focus,
    }, {
      where: {id: req.params.id},
      returning: true,
      plain: true,
    })
    res.status(201).send(response)
  }
  catch (err) {
    next(err)
  }
})

// GET THE DAYS FOR USE IN SELECT FIELDS (COFFEE, MUSIC, RESOURCES)
router.get('/days', async (req, res, next) => {
  try {
    const response = await Day.findAll({ order: [ ['createdAt', 'DESC'] ] })
    res.json(response)
  }
  catch (err) {
    next(err)
  }
})

// curl -d "month=july&day=20&year=2018&focus=I did some stuff and things" -X POST http://localhost:2000/api/timeline/add/day

// ADD A DAY
router.post('/add/day', async (req, res, next) => {
  try {
    const response = await Day.create({
      // date: req.body.date,
      month: req.body.month,
      day: req.body.day,
      year: req.body.year,
      focus: req.body.focus,
    })
    res.status(201).send(response)
  }
  catch (err) {
    res.status(500).send('Sorry, unable to add this')
    next(err)
  }
})

// ADD A COFFEE
router.post('/add/coffee', async (req, res, next) => {
  try {
    const response = await Coffee.create({
      name: req.body.name,
      roaster: req.body.roaster,
      dayId: req.body.dayId,
    })
    res.status(201).send(response)
  }
  catch (err) {
    res.status(500).send('Sorry, unable to add this')
    next(err)
  }
})

router.put('/update/coffee/:id', async (req, res, next) => {
  try {
    const response = await Coffee.update({
      name: req.body.name,
      roaster: req.body.roaster,
      dayId: req.body.dayId,
    }, {
      where: {id: req.params.id},
      returning: true,
      plain: true,
    })
    res.status(201).send(response)
  } catch(err) {
    res.status(500).send('Sorry, unable to update this')
    next(err)
  }
})

router.delete('/delete/coffee/:id', async (req, res, next) => {
  try {
    const response = await Coffee.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(202).send('deleted!')
  } catch(err) {
    res.status(500).send('Sorry, unable to delete this')
    next(err)
  }
})

// ADD MUSIC --> /api/timeline/add/music
router.post('/add/music', async (req, res, next) => {
  try {
    const response = await Music.create({
      album: req.body.album,
      song: req.body.song,
      artist: req.body.artist,
      dayId: req.body.dayId,
    })
    res.status(201).send(response)
  }
  catch (err) {
    res.status(500).send('Sorry, unable to add this')
    next(err)
  }
})

// ADD RESOURCE --> /api/timeline/add/resource
router.post('/add/resource', async (req, res, next) => {
  try {
    const response = await Resource.create({
      name: req.body.name,
      resourceUrl: req.body.resourceUrl,
      dayId: req.body.dayId,
    })
    res.status(201).send(response)
  }
  catch (err) {
    res.status(500).send('Sorry, unable to add this')
    next(err)
  }
})
