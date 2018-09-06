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
          console.log('CREATED DAY', createdDay);
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

  describe('/api/timeline/coffee, music, resource', async () => {
    // it('POST /add/coffee', async () => {
    //   const res = await request(app)
    //     .post('/api/timeline/coffee')
    //     .send({
    //       name: 'Ehitopia Guji Uraga',
    //       roaster: 'a fab roaster',
    //       dayId: '1'
    //     })
    //     .expect(201)
    // })
    //
    // it('POST /add/music', async () => {
    //   const res = await request(app)
    //     .post('/add/music')
    //     .send({
    //       album: 'a very good album',
    //       song: 'this song is a test',
    //       artist: 'another test',
    //       dayId: '1'
    //     })
    // })


  }) // end /api/timeline/coffee
}) // end timeline routes
