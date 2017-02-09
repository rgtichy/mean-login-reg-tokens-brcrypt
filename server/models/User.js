var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    required: true,
  },
  lastName: {
    type:  String,
    index: true,
    trim:  true,
    minlength: 2,
    required: true,
  },
  email: {
    type:  String,
    index: true,
    trim:  true,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  password: {
    type: String,
    minlength: 8,
    maxlength: 225
  },
});

module.exports = mongoose.model('User', UserSchema);
