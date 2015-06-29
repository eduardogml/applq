var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

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
    cuponsenviados: {
      type: Boolean,
      default: false
    },
    cupons: [{
      type: mongoose.Schema.ObjectId,
      ref: 'Cupon',
      default: null
    }]
  });

  schema.plugin(findOrCreate);
  return mongoose.model('Transactionid', schema);
};