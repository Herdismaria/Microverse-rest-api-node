//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
let mongoose = require('mongoose');
let Event = mongoose.model('Event');
let User = mongoose.model('User');

chai.use(chaiHttp);

const user_params = {
    username: 'Test username',
    password: 'Test password',
    email: 'test@email.com',
    fullname: 'Test name'
};
const auth_user = new User(user_params);

//Our parent block
describe('Events', () => {
  beforeEach(done => {
      Event.remove({}, err => {
          if (err) {
              done(err);
          }
      });
      User.remove((err) => {
          if (err) {
              done(err);
          }
      });

        done();
    });

  //Test the /GET events list route
  describe('/GET events', () => {
    it('it should GET all the events', done => {

        auth_user.save((err, user) => {
            chai
                .request(server)
                .get('/events')
                .auth(user.username, user.password)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.should.not.have.property('errors');
                    done();
                });
        });
    });
  });

  describe('/POST event', () => {
    it('it should create a new event', done => {
      let event = {
        title: 'Test title',
        description: 'Test description',
        date: new Date('2012-12-12'),
      };
        auth_user.save((err, user) => {
            chai
                .request(server)
                .post('/events')
                .send(event)
                .auth(user.username, user.password)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('description');
                    res.body.should.have.property('date');
                    res.body.should.have.property('_id');
                    res.body.title.should.equal(event.title);
                    res.body.description.should.equal(event.description);
                    res.body.date.should.equal(event.date.toISOString());
                    res.body.should.not.have.property('errors');
                    done();
                });
        });
    });
  });

  describe('/GET single event', () => {
    it('it should get single event', done => {
      let event = new Event({
        title: 'Test title',
        description: 'Test description',
        date: new Date('2016-12-12'),
      });
      event.save((err, event) => {
          auth_user.save((err, user) => {
              chai
                  .request(server)
                  .get('/events/' + event._id)
                  .auth(user.username, user.password)
                  .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.be.a('object');
                      res.body.should.have.property('title');
                      res.body.should.have.property('description');
                      res.body.should.have.property('date');
                      res.body.should.have.property('_id');
                      res.body._id.should.equal(event._id.toString());
                      res.body.title.should.equal(event.title);
                      res.body.description.should.equal(event.description);
                      res.body.date.should.equal(event.date.toISOString());
                      res.body.should.not.have.property('errors');
                      done();
                  });
          });
      });
    });

    it('it should fail get single event cause of non-existent event', done => {
      const nonExistentEventId = 'non-existent-uuid';
      chai
        .request(server)
        .get('/events/' + nonExistentEventId)
        .end((err, res) => {
          res.should.have.status(404);
          res.error.should.not.equal(null);
          done();
        });
    });
  });

//   describe('/PATCH event', () => {
//     it('it should update the whole event', done => {
//       let event = new Event({
//         title: 'Test title',
//         description: 'Test description',
//         date: new Date('2016-12-12'),
//       });
//       let updated_event_params = {
//         title: 'Updated event',
//         description: 'Updated description',
//         date: new Date('2013-12-12'),
//       };
//
//       event.save((err, updated_event) => {
//         chai
//           .request(server)
//           .patch('/events/' + event._id)
//           .send(updated_event_params)
//           .end((err, res) => {
//             res.should.have.status(200);
//             res.body.should.be.a('object');
//             res.body.should.have.property('title');
//             res.body.should.have.property('description');
//             res.body.should.have.property('date');
//             res.body.should.have.property('_id');
//             res.body._id.should.equal(event._id.toString());
//             res.body.title.should.equal(updated_event_params.title);
//             res.body.description.should.equal(updated_event_params.description);
//             res.body.date.should.equal(updated_event_params.date.toISOString());
//             res.body.should.not.have.property('errors');
//             done();
//           });
//       });
//     });
//
//     it('it should update the title of the event', done => {
//       let event = new Event({
//         title: 'Test title',
//         description: 'Test description',
//         date: new Date('2016-12-12'),
//       });
//       let updated_event_params = {
//         title: 'Updated only title',
//       };
//       event.save((err, updated_event) => {
//         chai
//           .request(server)
//           .patch('/events/' + event._id)
//           .send(updated_event_params)
//           .end((err, res) => {
//             res.should.have.status(200);
//             res.body.should.be.a('object');
//             res.body.should.have.property('title');
//             res.body.should.have.property('description');
//             res.body.should.have.property('date');
//             res.body.should.have.property('_id');
//             res.body._id.should.equal(event._id.toString());
//             res.body.title.should.equal(updated_event_params.title);
//             res.body.description.should.equal(event.description);
//             res.body.date.should.equal(event.date.toISOString());
//             res.body.should.not.have.property('errors');
//             done();
//           });
//       });
//     });
//
//     it('it should fail event update cause of non-existent event', done => {
//       const nonExistentEventId = 'non-existent-uuid';
//       let updated_event_params = {
//         title: 'Updated title',
//       };
//       chai
//         .request(server)
//         .patch('/events/' + nonExistentEventId)
//         .send(updated_event_params)
//         .end((err, res) => {
//           res.should.have.status(404);
//           done();
//         });
//     });
//   });
//
//   describe('/DELETE event', () => {
//     it('it should delete single event', done => {
//       let event = new Event({
//         title: 'Test title',
//         description: 'Test description',
//         date: new Date('2016-12-12'),
//       });
//       event.save((err, event) => {
//         chai
//           .request(server)
//           .delete('/events/' + event._id)
//           .end((err, res) => {
//             res.should.have.status(200);
//             res.body.should.be.empty;
//             res.body.should.not.have.property('errors');
//             done();
//           });
//       });
//     });
//
//     it('it should fail event delete cause of non-existent event', done => {
//       const nonExistentEventId = 2017;
//       chai
//         .request(server)
//         .delete('/events/' + nonExistentEventId)
//         .end((err, res) => {
//           res.should.have.status(404);
//           done();
//         });
//     });
//   });
//
//   // Search events by title
//   describe('/GET events by title', () => {
//         it('it should search all the events by title', done => {
//             let event = new Event({
//                 title: 'Search event',
//                 description: 'Search event description',
//                 date: new Date('2016-12-12')
//             });
//             event.save((err, event) => {
//                 chai
//                     .request(server)
//                     .get('/events/search?title=' + event.title)
//                     .end((err, res) => {
//                         res.should.have.status(200);
//                         res.body.should.be.a('array');
//                         res.body[0]._id.should.equal(event._id.toString());
//                         res.body[0].title.should.equal(event.title);
//                         res.body[0].description.should.equal(event.description);
//                         res.body[0].date.should.equal(event.date.toISOString());
//                         res.body.should.not.have.property('errors');
//                         done();
//                     });
//             });
//
//         });
//     });
 });
