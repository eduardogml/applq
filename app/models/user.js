var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

module.exports = function() {
  
  var schema = mongoose.Schema({
  	username: {
  		type: String,
  		required: true,
  		index: {
  			unique: true
  		}
  	},
  	password: {
  		type: String,
  		required: true
  	},
  	email: {
  		type: String,
  		required: true
  	}
  });

  schema.plugin(findOrCreate);
  return mongoose.model('User', schema);
};