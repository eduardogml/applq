var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');
var funcoes = require('./../helpers/funcoes.js');

module.exports = function() {
  
  var schema = mongoose.Schema({
    data: {
      type: Date,
      default: funcoes.proximoSorteio()
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