var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

module.exports = function() {
  
  var schema = mongoose.Schema({
    useId: {
      type: String,
      default: '',
      required: true,
      index: {
        unique: true
      }
    },
    birthday: {
      type: String,
      default: ''
    },
    email: {
      type: String,
      default: ''
    },
    first_name: {
      type: String,
      default: ''
    },
    last_name: {
      type: String,
      default: ''
    },
    gender: {
      type: String,
      default: ''
    },
    link: {
      type: String,
      default: ''
    },
    transiction: [{
      type: String,
      default: null
    }]
  });

  schema.plugin(findOrCreate);
  return mongoose.model('Facebookuser', schema);
};