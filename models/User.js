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
    trim:  true,
    required: true,
  },
  email: {
    type:  String,
    required: true,
    index: true,
    unique: true;
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
    required: true,
  },
});

module.exports = mongoose.model('User', UserSchema);
