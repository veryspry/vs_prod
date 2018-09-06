/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const {
  Day,
  Resource,
  Coffee,
  Music
} = require('../db/models')


describe('Timeline Routes', () => {

  before(() => {
    return db.sync({force: true})
  })

  describe('/api/timeline', () => {

    it('POSTS a day', async () => {
        const res = await request(app)
          .post('/api/timeline/add/day')
          .send({
            month: 'September',
            day: 20,
            year: 2018,
            focus: 'I dont even know anymore',
          })
          .expect(201)
          const createdDay = await Day.findById(res.body.id)
          expect(createdDay.focus).to.be.equal('I dont even know anymore')
    })

    it('GET /api/timeline (get all days)', async () => {
      const res = await request(app)
        .get('/api/timeline')
        .expect(200)
      // this is just checking that the above post route works as it should
      expect(res.body[0].month).to.equal('September')
    })

    it('GET /api/timeline/:id', async () => {
      const res = await request(app)
        .get('/api/timeline/1')
        .expect(200)
        expect(res.body.focus).to.equal('I dont even know anymore')
    })
  }) // end /api/timeline

  describe('POST coffee, music & resource', () => {

    let newDay

    beforeEach(async () => {
      // create a new day
      newDay = await request(app)
        .post('/api/timeline/add/day')
        .send({
          month: 'September',
          day: 23,
          year: 2018,
          focus: 'just another day',
        })
        .expect(201)
    })

    it('POST /add/coffee', async () => {
      // add a coffee to the day
      const res = await request(app)
        .post('/api/timeline/add/coffee')
        .send({
          name: 'Ehitopia Guji Uraga',
          roaster: 'a fab roaster',
          dayId: newDay.body.id
        })
        .expect(201)
      // find the coffee and make sure it was added to the correct day
      const createdCoffee = await Coffee.findById(res.body.id)
      expect(createdCoffee.dayId).to.be.equal(newDay.body.id)
    })

    it('POST /add/music', async () => {
      // add some music for the day
      const res = await request(app)
        .post('/api/timeline/add/music')
        .send({
          album: 'a very good album',
          song: 'this song is a test',
          artist: 'another test',
          dayId: newDay.body.id
        })
        .expect(201)
      // find the music and make sure it was added to the correct day
      const addedMusic = await Music.findById(res.body.id)
      expect(addedMusic.dayId).to.be.equal(newDay.body.id)
    })

    it('POST /add/resource', async () => {
      // add a resource for the day
      const res = await request(app)
        .post('/api/timeline/add/resource')
        .send({
          name: 'a very testy resoucre',
          resourceUrl: 'http://thecoolesturl.com',
          dayId: newDay.body.id
        })
        .expect(201)
      const addedResource = await Resource.findById(res.body.id)
      expect(addedResource.dayId).to.be.equal(newDay.body.id)
    })
  }) // end POST /api/timeline/coffee, music, resource

  describe('PUT day, coffee, music, resource', () => {

    let newDay

    beforeEach(async () => {
      // create a new day
      newDay = await request(app)
        .post('/api/timeline/add/day')
        .send({
          month: 'September',
          day: 23,
          year: 2018,
          focus: 'just another day',
        })
    })

    it('PUT /update/:id', async () => {

      console.log("NEWDAY TEST", newDay.body);

      // update the day
      const res = await request(app)
        .put(`/api/timeline/update/${newDay.body.id}`)
        .send({
          month: 'August',
          day: 23,
          year: 2018,
          focus: 'just another day',
        })
        .expect(201)

      // find the original day that we created
      const updatedDay = await Day.findById(newDay.body.id)
      expect(updatedDay.month).to.be.equal('August')
    })

    it('PUT updates a coffee', async () => {

    })

  }) // end PUT /api/timeline/ coffee, music, resource
}) // end timeline routes
