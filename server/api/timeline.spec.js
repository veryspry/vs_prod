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

  describe('day routes', () => {
    it('POST creates a day', async () => {
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

    it('GET gets all days', async () => {
      const res = await request(app)
        .get('/api/timeline')
        .expect(200)
      // this is just checking that the above post route works as it should
      expect(res.body[0].month).to.equal('September')
    })

    it('GET gets a day', async () => {
      const res = await request(app)
        .get(`/api/timeline/${newDay.body.id}`)
        .expect(200)
        expect(res.body.focus).to.equal('just another day')
    })

    it('PUT updates a day', async () => {
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
  }) // end 'day routes'

  describe('coffee routes', () => {

    let newCoffee

    beforeEach(async () => {
      // add a coffee to the day
      newCoffee = await request(app)
        .post('/api/timeline/add/coffee')
        .send({
          name: 'Ehitopia Guji Uraga',
          roaster: 'a fab roaster',
          dayId: newDay.body.id
        })
        .expect(201)
    })

    it('POST adds a coffee', async () => {
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

    it('PUT updates a coffee', async () => {
      const res = await request(app)
        .put(`/api/timeline/update/coffee/${newCoffee.body.id}`)
        .send({
          name: 'Ehitopia Guji Uraga',
          roaster: 'roasted!',
          dayId: newDay.body.id
        })
        .expect(201)
      // find the originally created coffee
      const createdCoffee = await Coffee.findById(newCoffee.body.id)
      // check to see if it was updated
      expect(createdCoffee.roaster).to.equal('roasted!')
    })

    it('DELETE deletes a route', async () => {
      const res = await request(app)
        .delete(`/api/timeline/delete/coffee/${newCoffee.body.id}`)
        .expect(202)
      const deletedCoffee = await Coffee.findById(newCoffee.body.id)
      expect(deletedCoffee).to.equal(null)
    })
  }) // end coffee routes

  describe('music routes', () => {

        let newMusic

        beforeEach(async () => {
          // add a coffee to the day
          newMusic = await request(app)
            .post('/api/timeline/add/music')
            .send({
              album: 'a very good album',
              song: 'this song is a test',
              artist: 'another test',
              dayId: newDay.body.id
            })
            .expect(201)
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

    it('PUT updates a music entry', async () => {
      const res = await request(app)
        .put(`/api/timeline/update/music/${newMusic.body.id}`)
        .send({
          album: 'a very different album name',
          song: 'this song is a test',
          artist: 'another test',
          dayId: newDay.body.id
        })
        .expect(201)
      // find the originally created coffee
      const updatedMusic = await Music.findById(newMusic.body.id)
      // check to see if it was updated
      expect(updatedMusic.album).to.equal(res.body[1].album)
    })

    it('DELETE deletes a route', async () => {
      const res = await request(app)
        .delete(`/api/timeline/delete/music/${newMusic.body.id}`)
        .expect(202)
      const deletedMusic = await Music.findById(newMusic.body.id)
      expect(deletedMusic).to.equal(null)
    })

  }) // end POST /api/timeline/coffee, music, resource

  describe('resource routes', () => {

    let newResource

    beforeEach(async () => {
      newResource = await request(app)
      .post('/api/timeline/add/resource')
      .send({
        name: 'a very testy resoucre',
        resourceUrl: 'http://thecoolesturl.com',
        dayId: newDay.body.id
      })
      .expect(201)
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

    it('PUT updates a resource', async () => {
      const res = await request(app)
        .put(`/api/timeline/update/resource/${newResource.body.id}`)
        .send({
          name: 'a very tested & updated resoucre',
          resourceUrl: 'http://thecoolesturl.com',
          dayId: newDay.body.id
        })
        .expect(201)
      const updatedResource = await Resource.findById(newResource.body.id)
      expect(updatedResource.name).to.equal(res.body[1].name)
    })

    it('DELETE, deletes a resource', async () => {
      const res = await request(app)
        .delete(`/api/timeline/delete/resource/${newResource.body.id}`)
        .expect(202)
      const deletedResource = await Resource.findById(newResource.body.id)
      expect(deletedResource).to.equal(null)
    }) 
  }) // end PUT /api/timeline/ coffee, music, resource
}) // end timeline routes
