var ObjectID = require('mongodb').ObjectID;
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: {
    type: String,
    required: 'Kindly enter your username',
    unique: true
  },
  password: {
    type: String,
    required: 'Kindly enter your password',
  },
  email: {
    type: String,
    required: 'Kindly enter your email',
    unique: true
  },
  fullname: {
    type: String,
    required: 'Kindly enter your fullname',
  }
});

UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

const User = mongoose.model('User', UserSchema);

exports.create = function(params, callback) {
  let new_user = new User(params);
  new_user.save(function(err, user) {
    callback(err, user);
  });
};
