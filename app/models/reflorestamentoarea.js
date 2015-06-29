var mongoose = require('mongoose');

module.exports = function() {
  var schema = mongoose.Schema({
    nome: {
      type: String,
      default: '',
      required: true
    },
    email: {
      type: String,
      default: '',
      required: true
    },
    cidade:{
      type: String,
      default: '',
      required: true
    },
    estado:{
      type: String,
      default: '',
      required: true
    },
    telefone:{
      type: String,
      default: '',
      required: true
    },
    tamanho:{
      type: String,
      default: '',
      required: true
    },
    motivo:{
      type: String,
      default: '',
      required: true
    }
  });

  return mongoose.model('Reflorestamentoarea', schema);
};