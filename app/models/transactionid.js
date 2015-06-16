var mongoose = require('mongoose');

module.exports = function() {
  var schema = mongoose.Schema({
    id:{
      type: String,
      default: '',
      required: true,
      index: {
        unique: true
      }
    },
    qtdmudas: {
      type: Number,
      default: 1,
      min: 1,
      required: true
    },
    facebookname: {
      type: String,
      default: ''
    },
    facebookidapp: {
      type: String,
      default: ''
    },
    facebookemail: {
      type: String,
      default: ''
    },
    facebooklink: {
      type: String,
      default: ''
    },
    cupons: [{
      type: mongoose.Schema.ObjectId,
      ref: 'Cupon',
      default: null
    }]
  });

  return mongoose.model('Transactionid', schema);
};