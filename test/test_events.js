//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

// let mongoose = require("mongoose");
// let Book = require('../app/models/book');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
let data = require('../data');

chai.use(chaiHttp);
//Our parent block
describe('Events', () => {
  //Test the /GET events list route
  describe('/GET event', () => {
    it('it should GET all the events', done => {
      chai
        .request(server)
        .get('/events')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.not.have.property('errors');
          done();
        });
    });
  });

  describe('/POST event', () => {
    it('it should create a new event', done => {
      let event = {
        title: 'Test title',
        description: 'Test description',
        date: '12.12.2012',
      };

      chai
        .request(server)
        .post('/events')
        .send(event)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('title');
          res.body.should.have.property('description');
          res.body.should.have.property('date');
          res.body.should.have.property('id');
          res.body.title.should.equal('Test title');
          res.body.description.should.equal('Test description');
          res.body.date.should.equal('12.12.2012');
          res.body.should.not.have.property('errors');
          done();
        });
    });
  });

  describe('GET single event', () => {
    it('it should get single event', done => {
      chai
        .request(server)
        .get('/events/' + 0)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('title');
          res.body.should.have.property('description');
          res.body.should.have.property('date');
          res.body.should.have.property('id');
          res.body.id.should.equal(0);
          res.body.should.not.have.property('errors');
          done();
        });
    });
  });

  describe('/PATCH event', () => {
    it('it should update the whole event', done => {
      let event = {
        title: 'Updated title',
        description: 'Updated description',
        date: '12.12.2013',
      };

      chai
        .request(server)
        .patch('/events/' + 0)
        .send(event)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('title');
          res.body.should.have.property('description');
          res.body.should.have.property('date');
          res.body.should.have.property('id');
          res.body.id.should.equal(0);
          res.body.title.should.equal('Updated title');
          res.body.description.should.equal('Updated description');
          res.body.date.should.equal('12.12.2013');
          res.body.should.not.have.property('errors');
          done();
        });
    });

    it('it should update the title of the event', done => {
      const id = 0;
      let event = {
        title: 'Updated title',
      };

      chai
        .request(server)
        .patch('/events/' + id)
        .send(event)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('title');
          res.body.should.have.property('description');
          res.body.should.have.property('date');
          res.body.should.have.property('id');
          res.body.id.should.equal(0);
          res.body.title.should.equal('Updated title');
          res.body.description.should.equal(data[id].description);
          res.body.should.not.have.property('errors');
          done();
        });
    });
  });
});
