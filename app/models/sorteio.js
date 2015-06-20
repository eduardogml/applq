var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

module.exports = function() {
  
  var schema = mongoose.Schema({
    data: {
      type: Date,
      default: null
    },
    status: {
      type: String,
      default: 'ANDAMENTO'
    },
    resultado: {
      type: String,
      default: ''
    },
    created_at: {
      type: Date,
      default: Date.now
    }
  });

  schema.plugin(findOrCreate);
  return mongoose.model('Sorteio', schema);
};