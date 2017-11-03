//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
let mongoose = require('mongoose');
let User = mongoose.model('User');
var bcrypt = require('bcrypt');

chai.use(chaiHttp);

//Our parent block
describe('Users', () => {
    beforeEach(done => {
        User.remove({}, err => {
            done();
        });
    });

    describe('/POST user', () => {
        it('it should create a new user', done => {
            let user = {
                username: 'Test username',
                password: 'Test password',
                email: 'test@email.com',
                fullname: 'Test name'
            };
            chai
                .request(server)
                .post('/users')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('username');
                    res.body.should.have.property('password');
                    res.body.should.have.property('email');
                    res.body.should.have.property('fullname');
                    res.body.should.have.property('_id');
                    res.body.username.should.equal(user.username);
                    bcrypt.compare(user.password, res.body.password).then(
                        res => {
                            res.should.equal(true);

                        }
                    );
                    res.body.email.should.equal(user.email);
                    res.body.fullname.should.equal(user.fullname);
                    res.body.should.not.have.property('errors');
                    done();
                });
        });
        it('it should return status 409 because of duplicated username/email', done => {

            let user_params = {
                username: 'Test username',
                password: 'Test password',
                email: 'test@email.com',
                fullname: 'Test name'
            };

            let user = new User(user_params);

            user.save((err, user) => {
                chai
                    .request(server)
                    .post('/users')
                    .send(user_params)
                    .end((err, res) => {
                        res.should.have.property('error');
                        res.should.have.status(409);
                        res.error.text.should.equal('The username or email already exists');
                        done();
                    });
            });
        });

        it('it should return status 400 because of validation error', done => {

            let user = {
                username: 'Test username'
            };

                chai
                    .request(server)
                    .post('/users')
                    .send(user)
                    .end((err, res) => {
                        res.should.have.status(400);
                        res.should.have.property('error');
                        res.error.text.should.equal('User validation failed: fullname: Kindly enter your fullname, email: Kindly enter your email, password: Kindly enter your password');
                        done();
                    });
        });
    });
});
