var mongoose = require('mongoose');

module.exports = function() {
  var schema = mongoose.Schema({
    numero: {
      type: String,
      default: '',
      required: true
    },
    created_at: {
      type: Date,
      default: Date.now
    },
    the_sorteio:{
      type: mongoose.Schema.ObjectId,
      ref: 'Sorteio',
      default: null
    }
  });

  return mongoose.model('Cupon', schema);
};